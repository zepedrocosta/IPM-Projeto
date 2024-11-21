import * as Notifications from 'expo-notifications';

// Request Notification Permissions
export async function requestNotificationPermission(): Promise<boolean> {
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== 'granted') {
    const { status: newStatus } = await Notifications.requestPermissionsAsync();
    if (newStatus !== 'granted') {
      alert('Notification permissions are required.');
      return false;
    }
  }
  return true;
}

// Schedule a Notification
export async function scheduleOneMinuteReminder(documentCategory: string) {
  const hasPermission = await requestNotificationPermission();
  if (!hasPermission) return;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Reminder",
      body: `Your ${documentCategory} is about to expire soon!`,
      sound: true,
    },
    trigger: {
      seconds: 10, // Schedule after 1 minute
      repeats: false, // Ensure it doesn't repeat
    } as unknown as Notifications.NotificationTriggerInput, // Cast to satisfy types
  });
}