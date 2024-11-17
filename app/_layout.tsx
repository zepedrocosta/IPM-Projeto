import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="main" />
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="location" />
    </Stack>
  );
}
