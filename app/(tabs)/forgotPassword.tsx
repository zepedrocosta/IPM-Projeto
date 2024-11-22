import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleResetPassword = () => {
    if (email) {
      Alert.alert(
        "Password Reset",
        `A password reset link has been sent to ${email}.`
      );
    } else {
      Alert.alert("Error", "Please enter a valid email address.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.insideContainer}>
        <Text style={styles.title}>Forgot Password</Text>
        <View style={styles.iconContainer}>
          <MaterialIcons name="lock-reset" size={40} color="blue" />
        </View>
      </View>

      <View style={styles.insideContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={(value) => setEmail(value)}
          keyboardType="email-address"
        />
        <Pressable style={styles.button} onPress={handleResetPassword}>
          <Text style={styles.buttonText}>Reset Password</Text>
        </Pressable>
        <Text
          style={styles.backToSignIn}
          onPress={() => router.push("/sign-in")}
        >
          Back to Sign In
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
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
  insideContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    width: "100%",
  },
  iconContainer: {
    backgroundColor: "#3498db",
    borderRadius: 50,
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
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
  backToSignIn: {
    fontSize: 18,
    color: "blue",
    textDecorationLine: "underline",
    marginTop: 10,
  },
});
