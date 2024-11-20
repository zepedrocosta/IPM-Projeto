import { Stack } from "expo-router";
import { Provider } from "react-redux";
import store from "../store";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="main" />
          <Stack.Screen name="(tabs)/sign-in" />
          <Stack.Screen name="(tabs)/location" />
        </Stack>
      </Provider>
    </GestureHandlerRootView>
  );
}
