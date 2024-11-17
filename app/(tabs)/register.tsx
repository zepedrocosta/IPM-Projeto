import React, { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { httpPost } from "@/utils/http";

// TypeScript type definition that specifies the structure of the navigatio stack. Each key represents a screen name, and the value represents the screen exports.
// Home: undefined; -> indicates that the Home screen exists and doesn't require any parameters to navigate to it
// This type helps TypeScript understand what screens are available inn the navigation stack and ensures type safety when navigating
type RootStackParamList = {
  Home: undefined;
  Register: undefined; //might have to say NoLogin() or such
};

type RegisterScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList, // stack of available screens
  "Register" // specifies that this navigation prop is specifically for the Register screen
>;

// This is the start of the functional component for the Register screen. We export it as the default export so that it can be imported and used elsewhere in the app.
export default function Register() {
  const [form, setForm] = useState({
    email: "",
    nickname: "",
    password: "",
    confirmPassword: "",
  });

  // This function will be triggered when the Register button is pressed.
  const handleRegister = () => {
    if (form.password === form.confirmPassword) {
      httpPost("/users", form).then(
        () => {
          navigateToSignIn();
        },
        (err) => {
          console.error(err);
        }
      );
    } else {
      console.log("Passwords do not match");
    }
  };

  const router = useRouter(); // Use the router hook for navigation

  const navigateToSignIn = () => {
    router.push("/sign-in"); // Navigate to the register page
  };

  return (
    <View style={styles.container}>
      <h1>Register</h1>
      <TouchableOpacity style={styles.iconContainer}>
        <MaterialIcons name="person-add" size={40} color="blue" />
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={form.email}
        onChangeText={(value) => setForm({ ...form, email: value })}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={form.nickname}
        onChangeText={(value) => setForm({ ...form, nickname: value })}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={form.password}
        onChangeText={(value) => setForm({ ...form, password: value })}
        secureTextEntry // replaces the password text with dots for added security
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={form.confirmPassword}
        onChangeText={(value) => setForm({ ...form, confirmPassword: value })}
        secureTextEntry // replaces the password text with dots for added security
      />
      <Button title="Register" onPress={() => handleRegister()} />
      <Text onPress={() => navigateToSignIn()}>Sign In</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
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
    marginBottom: 20, // Space between icon and text inputs
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
});
