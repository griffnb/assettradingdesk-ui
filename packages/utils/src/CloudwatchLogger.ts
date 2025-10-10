import {
  CloudWatchLogsClient,
  CreateLogGroupCommand,
  CreateLogStreamCommand,
  DescribeLogGroupsCommand,
  DescribeLogStreamsCommand,
  PutLogEventsCommand,
} from "@aws-sdk/client-cloudwatch-logs";

type LogLevel = "INFO" | "ERROR" | "WARN";

class CloudWatchLogger {
  private static instance: CloudWatchLogger | null = null;
  private cloudWatchLogs: CloudWatchLogsClient;
  private logGroupName: string;
  private sequenceToken?: string;
  public isLocal: boolean = false;

  private constructor(
    logGroupName: string,
    region: string,
    accessKeyId?: string,
    secretAccessKey?: string
  ) {
    // Configure CloudWatchLogsClient options
    const options: any = {
      region,
    };

    if (accessKeyId && secretAccessKey) {
      options.credentials = {
        accessKeyId,
        secretAccessKey,
      };
    }

    // Create the CloudWatch Logs client
    this.cloudWatchLogs = new CloudWatchLogsClient(options);
    this.logGroupName = logGroupName;
  }

  // Singleton initialization method
  public static initialize(
    logGroupName: string,
    region: string = "us-east-1",
    accessKeyId?: string,
    secretAccessKey?: string
  ): CloudWatchLogger {
    if (!this.instance) {
      this.instance = new CloudWatchLogger(
        logGroupName,
        region,
        accessKeyId,
        secretAccessKey
      );
    }
    return this.instance;
  }

  // Get the existing instance
  public static getInstance(): CloudWatchLogger {
    if (!this.instance) {
      throw new Error(
        "CloudWatchLogger has not been initialized. Call initialize() first."
      );
    }
    return this.instance;
  }

  // Build log stream name based on date and host name
  private buildStreamName(host: string): string {
    const date = new Date().toISOString().split("T")[0]; // Format as YYYY-MM-DD

    const hostName = import.meta.env?.HOSTNAME || "local";
    const formattedHost = host.replace(/\./g, "-");
    return `${formattedHost}-${date}-${hostName}`;
  }

  // Ensure the log group exists, or create it if it doesn't
  private async ensureLogGroupExists(): Promise<void> {
    try {
      const describeLogGroupsCommand = new DescribeLogGroupsCommand({
        logGroupNamePrefix: this.logGroupName,
      });
      const response = await this.cloudWatchLogs.send(describeLogGroupsCommand);

      if (!response.logGroups || response.logGroups.length === 0) {
        const createLogGroupCommand = new CreateLogGroupCommand({
          logGroupName: this.logGroupName,
        });
        await this.cloudWatchLogs.send(createLogGroupCommand);
      }
    } catch (error) {
      throw new Error(`Error ensuring log group exists: ${error}`);
    }
  }

  // Ensure the log stream exists, or create it if it doesn't
  private async ensureLogStreamExists(host: string): Promise<void> {
    const logStreamName = this.buildStreamName(host);
    const describeLogStreamsCommand = new DescribeLogStreamsCommand({
      logGroupName: this.logGroupName,
      logStreamNamePrefix: logStreamName,
    });

    const response = await this.cloudWatchLogs.send(describeLogStreamsCommand);

    if (!response.logStreams || response.logStreams.length === 0) {
      const createLogStreamCommand = new CreateLogStreamCommand({
        logGroupName: this.logGroupName,
        logStreamName,
      });
      await this.cloudWatchLogs.send(createLogStreamCommand);
    } else {
      this.sequenceToken = response.logStreams?.[0]?.uploadSequenceToken;
    }
  }

  // Put log events into the log stream
  private async putEvent(host: string, message: string): Promise<void> {
    if (this.isLocal) {
      console.log(message);
      return;
    }

    await this.ensureLogGroupExists();
    await this.ensureLogStreamExists(host);

    const logStreamName = this.buildStreamName(host);
    const putLogEventsCommand = new PutLogEventsCommand({
      logGroupName: this.logGroupName,
      logStreamName,
      logEvents: [
        {
          message,
          timestamp: Date.now(),
        },
      ],
      sequenceToken: this.sequenceToken, // ignored in v3
    });

    try {
      const result = await this.cloudWatchLogs.send(putLogEventsCommand);
      this.sequenceToken = result.nextSequenceToken;
    } catch (err) {
      console.error("Error sending log event:", err);
    }
  }

  private formatLogMessage(
    level: LogLevel,
    message: string,
    additionalData: Record<string, any> = {}
  ): string {
    const timestamp = new Date().toISOString();
    const logData = {
      timestamp,
      level,
      message,
      ...additionalData, // Include any additional context (e.g., request details)
    };

    // Return the formatted log as a JSON string for easier parsing
    return JSON.stringify(logData);
  }

  Info(
    host: string,
    message: string,
    additionalData: Record<string, any> = {}
  ): Promise<void> {
    return this.putEvent(
      host,
      this.formatLogMessage("INFO", message, additionalData)
    );
  }

  Error(
    host: string,
    message: string,
    additionalData: Record<string, any> = {}
  ): Promise<void> {
    return this.putEvent(
      host,
      this.formatLogMessage("ERROR", message, additionalData)
    );
  }

  Warn(
    host: string,
    message: string,
    additionalData: Record<string, any> = {}
  ): Promise<void> {
    return this.putEvent(
      host,
      this.formatLogMessage("WARN", message, additionalData)
    );
  }
}

export default CloudWatchLogger;
