import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

// TypeScript type definition that specifies the structure of the navigatio stack. Each key represents a screen name, and the value represents the screen exports.
// Home: undefined; -> indicates that the Home screen exists and doesn't require any parameters to navigate to it
// This type helps TypeScript understand what screens are available inn the navigation stack and ensures type safety when navigating
type RootStackParamList = {
  Home: undefined;
  Register: undefined; //might have to say NoLogin() or such
}


type RegisterScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList, // stack of available screens
  'Register' // specifies that this navigation prop is specifically for the Register screen
>;

// This is the start of the functional component for the Register screen. We export it as the default export so that it can be imported and used elsewhere in the app.
export default function Register() {
  //Here, we call the useNavigation hook and provide it with the type RegisterScreenNavigationProp so that TypeScript knows what screens are in the navigation stack. This hook returns the navigation object, which we can use to navigate between screens.
  const navigation = useNavigation<RegisterScreenNavigationProp>();

  // UseState Hook
  // These useState hooks create state variables to store the input values for email, username, password, and confirm password. As the user types, these variables are updated.
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // This function will be triggered when the Register button is pressed.
  const handleRegister = () => {
    if (password === confirmPassword && password.trim.length > 0 && confirmPassword.trim.length > 0) {
      // Handle registration logic here
      console.log('Registering with:', email, username, password);
    } else {
      console.log('Passwords do not match');
    }
  }

  return (
    <View style={styles.container}>
      <h1>Register</h1>

      <TouchableOpacity style={styles.iconContainer}>
        <MaterialIcons name="person-add" size={40} color="blue" />
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry // replaces the password text with dots for added security
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry // replaces the password text with dots for added security
      />

      <Button title="Register" onPress={() => handleRegister()} />

      <Text>Sign In</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  iconContainer: {
    backgroundColor: '#3498db', // Circle color
    borderRadius: 50, // Circular shape
    padding: 20,
    marginBottom: 20, // Space between icon and text inputs
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
});
