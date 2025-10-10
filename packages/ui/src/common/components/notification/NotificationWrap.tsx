import { NotificationService } from "@/common_lib/services/NotificationService";
import { observer } from "mobx-react-lite";
import { Notification } from "./Notification";

const NotificationWrap = observer(() => {
  const notifications = NotificationService.notifications;

  return (
    <div className="z-notification fixed right-3 top-3">
      {notifications.map((notification, index) => (
        <Notification key={index} notification={notification} />
      ))}
    </div>
  );
});

export default NotificationWrap;
