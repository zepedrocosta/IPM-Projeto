import React, { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

// This is the start of the functional component for the Register screen. We export it as the default export so that it can be imported and used elsewhere in the app.
export default function Register() {
  const [form, setForm] = useState({
    email: "",
    nickname: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegister = async () => {
    if (form.password === form.confirmPassword) {
      try {
        const user = {
          email: form.email,
          nickname: form.nickname,
          password: form.password, // Store only if needed; otherwise, omit for security.
        };

        // Save user data in AsyncStorage
        await AsyncStorage.setItem("user", JSON.stringify(user));

        // Navigate to the Sign-In page
        navigateToSignIn();
      } catch (error) {
        console.error("Error saving user:", error);
      }
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
      <View style={styles.insideContainer}>
        <Text style={styles.title}>Register</Text>
        <TouchableOpacity style={styles.iconContainer}>
          <MaterialIcons name="person-add" size={40} color="blue" />
        </TouchableOpacity>
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
      </View>

      <View style={styles.insideContainer}>
        <Pressable style={styles.button} onPress={() => handleRegister()}>
          <Text style={styles.buttonText}>Register</Text>
        </Pressable>
        <Text style={styles.buttonRegister} onPress={() => navigateToSignIn()}>Sign In</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  signInTitle: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  container: {
    height: '85%',
    width: '100%',
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  forgotPassword: {
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
  },
  insideContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    width: '100%',
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
    backgroundColor: 'rgba(33,150,243,1.00)',
    paddingVertical: 10,
    borderRadius: 2,
    display: 'flex',
    width: "80%",
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 20
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonRegister: {
    paddingVertical: 10,
    borderRadius: 2,
    width: "80%",
    marginBottom: 20,
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
  },
});
