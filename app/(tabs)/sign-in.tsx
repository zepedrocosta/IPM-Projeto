import React, { useState } from "react";
import {
  View,
  Text,
  ToastAndroid,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { httpPut } from "@/utils/http";
import { login } from "@/store/session";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { sessionSelector } from "@/store/session";
import Documents from "@/components/DocumentsList";

type RootStackParamList = {
  Home: undefined;
  SignIn: undefined; //might have to say NoLogin() or such
};

type SignInScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "SignIn"
>;

// This is the start of the functional component for the Register screen. We export it as the default export so that it can be imported and used elsewhere in the app.
export default function SignIn() {
  const navigation = useNavigation<SignInScreenNavigationProp>();
  const dispatch = useDispatch();
  const session = useSelector(sessionSelector);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const router = useRouter(); // Use the router hook for navigation

  const navigateToMain = () => {
    router.replace("/main"); // Navigate to the register page
  };

  const navigateToRegister = () => {
    router.push("/register"); // Navigate to the register page
  };

  const handleSignIn = async () => {
    await httpPut("/security", form).then(
      (res) => {
        let t: any = jwtDecode(res.headers["authorization"].split(" ")[1]);
        dispatch(
          login({
            email: t.email,
            nickname: t.nickname,
            token: res.headers["authorization"],
            role: t.role,
            iat: t.iat,
            exp: t.exp,
            jti: t.jti,
            isLogged: true,
          })
        );
        navigateToMain();
      },
      (error) => {
        const regex403 = /403/;
        if (regex403.test(error.message)) {
          ToastAndroid.show("Invalid credentials", ToastAndroid.LONG);
        } else {
          ToastAndroid.show(error.toString(), ToastAndroid.LONG);
        }
      }
    );
  };

  const navigateToForgotPassword = () => {
    router.push("/(tabs)/forgotPassword"); // Navigate to the register page
  };

  return (
    <View style={styles.container}>
      <View style={styles.insideContainer}>
        <Text style={styles.signInTitle}>Sign In</Text>
        <View style={styles.iconContainer}>
          <MaterialIcons name="person" size={40} color="blue" />
        </View>
      </View>

      <View style={styles.insideContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={form.email}
          onChangeText={(value) => setForm({ ...form, email: value })}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={form.password}
          onChangeText={(value) => setForm({ ...form, password: value })}
          secureTextEntry // replaces the password text with dots for added security
        />
        <Pressable onPress={() => navigateToForgotPassword()}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </Pressable>
      </View>

      <View style={styles.insideContainer}>
        <Pressable style={styles.button} onPress={() => handleSignIn()}>
          <Text style={styles.buttonText}>Sign In</Text>
        </Pressable>
        <Text
          style={styles.buttonRegister}
          onPress={() => navigateToRegister()}
        >
          Register
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  signInTitle: {
    fontSize: 25,
    fontWeight: "bold",
  },
  container: {
    height: "85%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  forgotPassword: {
    textDecorationStyle: "solid",
    textDecorationLine: "underline",
  },
  insideContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  iconContainer: {
    backgroundColor: "#3498db", // Circle color
    borderRadius: 50, // Circular shape
    padding: 20,
    marginTop: 20, // Space between icon and text inputs
    marginBottom: 20, // Space between icon and text inputs
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 12,
    fontSize: 20,
  },
  button: {
    backgroundColor: "rgba(33,150,243,1.00)",
    paddingVertical: 10,
    borderRadius: 2,
    display: "flex",
    width: "80%",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonRegister: {
    paddingVertical: 10,
    borderRadius: 2,
    width: "80%",
    marginBottom: 20,
    fontSize: 20,
    color: "black",
    textAlign: "center",
  },
});
