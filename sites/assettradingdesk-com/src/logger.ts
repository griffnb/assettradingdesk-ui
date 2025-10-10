import CloudWatchLogger from "@/utils/CloudwatchLogger";

// Initialize the logger globally here
const Log = CloudWatchLogger.initialize(
  import.meta.env.LOG_GROUP_NAME || "UNSET", // CloudWatch Log Group Name
  "us-east-1", // AWS Region
  import.meta.env.CLOUDWATCH_ACCESS_KEY_ID, // Access Key (from environment)
  import.meta.env.CLOUDWATCH_SECRET_ACCESS_KEY, // Secret Key (from environment)
);

if (import.meta.env.LOCAL_LOG) {
  Log.isLocal = true;
}

export default Log;
