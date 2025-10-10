import { generateUUID } from "@/utils/strings";
import { action, makeAutoObservable } from "mobx";
import { ReactNode } from "react";

export interface NotificationItem {
  id: string;
  type: "error" | "success" | "standard";
  message: string;
  body?: ReactNode;
}

// type error, alert, saving, success
class NotificationServiceClass {
  private static instance: NotificationServiceClass;
  notifications: Array<NotificationItem> = [];

  public static getInstance(): NotificationServiceClass {
    if (!NotificationServiceClass.instance) {
      NotificationServiceClass.instance = new NotificationServiceClass();
    }

    return NotificationServiceClass.instance;
  }

  private constructor() {
    // Initialize your properties here

    makeAutoObservable(this, {
      addWithTimeout: action,
      addNotification: action,
      clearNotification: action,
      addError: action,
      clearLast: action,
      clearAll: action,
    });
  }

  addWithTimeout(
    type: "error" | "success" | "standard",
    seconds: number,
    message: string,
    body?: ReactNode,
  ) {
    const objID = this.addNotification(type, message, body);
    setTimeout(() => {
      this.clearNotification(objID);
    }, seconds * 1000);
  }

  addNotification(
    type: "error" | "success" | "standard",
    message: string,
    body?: ReactNode,
  ) {
    const objid = generateUUID();
    this.notifications.push({
      id: objid,
      type: type,
      message: message,
      body: body,
    });
    return objid;
  }
  clearNotification(notificationId: string) {
    const notifs = this.notifications;

    let indexToRemove = -1;
    notifs.forEach((notificationObj, index) => {
      if ((notificationObj.id = notificationId)) {
        indexToRemove = index;
        return;
      }
    });
    if (indexToRemove >= 0) {
      this.notifications.splice(indexToRemove, 1);
    }
  }
  addError(errorMessage: string, body?: ReactNode) {
    this.addWithTimeout("error", 3, errorMessage || "An error occurred", body);
  }

  addSuccess(message: string, body?: ReactNode) {
    this.addWithTimeout("success", 3, message, body);
  }
  clearLast() {
    const notifs = this.notifications;
    if (notifs.length == 0) {
      return;
    }
    this.notifications.splice(this.notifications.length - 1, 1);
  }
  clearAll() {
    this.notifications = [];
  }
}
// Export the single instance
export const NotificationService = NotificationServiceClass.getInstance();
