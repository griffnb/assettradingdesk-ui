import { action, makeAutoObservable, runInAction } from "mobx";
import { ServerService } from "./ServerService";

// type error, alert, saving, success
class DownloadServiceClass {
  activeKey: string | null = null;
  downloadURL: string | null = null;
  downloadReady = false;
  showNotification = false;

  private static instance: DownloadServiceClass;

  public static getInstance(): DownloadServiceClass {
    if (!DownloadServiceClass.instance) {
      DownloadServiceClass.instance = new DownloadServiceClass();
    }

    return DownloadServiceClass.instance;
  }

  startDownload(downloadKey: string) {
    this.downloadKey = downloadKey;
    this.showNotification = true;

    setTimeout(async () => {
      await this.checkDownload();
    }, 1000);
  }

  clearDownload() {
    this.activeKey = null;
    this.downloadURL = null;
    this.downloadReady = false;
    this.showNotification = false;
    localStorage.removeItem("download_key");
  }

  /*
  {
    ready:bool,
    error:bool,
    download_url:string,
  }
*/
  async checkDownload() {
    const response = await ServerService.callGet("download", "check", {
      key: this.downloadKey,
    });

    if (response.data.ready) {
      runInAction(() => {
        this.downloadURL = response.data.download_url;
        this.downloadReady = true;
      });
    } else {
      if (response.data.error) {
        alert(
          "There was an error generating the file. We have been notified, please try again.",
        );
        this.clearDownload();
        return;
      }

      setTimeout(async () => {
        await this.checkDownload();
      }, 1000);
    }
  }

  get downloadKey(): string {
    if (this.activeKey) {
      return this.activeKey;
    }
    const localKey = localStorage.getItem("download_key");
    if (localKey) {
      this.activeKey = localKey;
      return localKey;
    }

    return "";
  }

  set downloadKey(key: string) {
    localStorage.setItem("download_key", key);
    this.activeKey = key;
  }

  private constructor() {
    // Initialize your properties here

    makeAutoObservable(this, {
      checkDownload: action,
      clearDownload: action,
      startDownload: action,
    });
  }
}
// Export the single instance
export const DownloadService = DownloadServiceClass.getInstance();
