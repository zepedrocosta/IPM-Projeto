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
export async function scheduleOneMinuteReminder(documentName: string) {
  const hasPermission = await requestNotificationPermission();
  if (!hasPermission) return;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Reminder",
      body: `Your ${documentName} is about to expire soon!`,
      sound: true,
    },
    trigger: { // THINK THIS IS FUCKING ITSELF BC OF THE VERSIONS
      seconds: 60, // Time delay in seconds
      repeats: false, // Ensures it does not repeat
      type: 'timeInterval', // Explicitly specify the trigger type
    },
  });
}
