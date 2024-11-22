import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { sessionSelector, login, logout } from "@/store/session";
import SignIn from "./(tabs)/sign-in";
import * as Notifications from "expo-notifications";
import { requestNotificationPermission } from "@/utils/notifications";
import "react-native-get-random-values";

// Set global notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const dispatch = useDispatch();
  const router = useRouter();
  const session = useSelector(sessionSelector);

  useEffect(() => {
    const fetchToken = async () => {
      //AsyncStorage.removeItem("token");
      let token = await AsyncStorage.getItem("token");
      if (token !== null) {
        let t: any = jwtDecode(token.split(" ")[1]);
        if (t.exp * 1000 > Date.now()) {
          dispatch(
            login({
              email: t.email,
              nickname: t.nickname,
              token: token,
              role: t.role,
              iat: t.iat,
              exp: t.exp,
              jti: t.jti,
              isLogged: true,
            })
          );
          if (session.isLogged) {
            router.replace("/main");
          }
        } else {
          dispatch(logout());
          router.replace("/sign-in");
        }
      }
    };

    fetchToken();
    requestNotificationPermission();
  }, []);

  useEffect(() => {
    if (session.isLogged) {
      router.replace("/main");
    }
  }, [session.isLogged]);

  return SignIn();
}

const styles = StyleSheet.create({
  topText: {
    fontSize: 25,
  },
});
