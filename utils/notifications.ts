import * as Notifications from "expo-notifications";

export const scheduleTodoNotification = async (title: string, date: Date) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "⏰ Todo Reminder",
      body: title,
      sound: true,
      
    },
    trigger: date,
  });
};

