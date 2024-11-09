import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';

type RootStackParamList = {
    Home: undefined;
    SignIn: undefined; //might have to say NoLogin() or such
}


type SignInScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList, 
    'SignIn' 
>;

// This is the start of the functional component for the Register screen. We export it as the default export so that it can be imported and used elsewhere in the app.
export default function SignIn() {
    const navigation = useNavigation<SignInScreenNavigationProp>();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // This function will be triggered when the SignIn button is pressed.
    const handleSignIn = () => {
        if (password.trim.length > 0) {
            // Handle sign in logic here
            console.log('Sign in with:', email, password);
        } else {
            console.log('Password is empty');
        }
    }

    const router = useRouter(); // Use the router hook for navigation
  
    const navigateToMain = () => {
      router.push('/main'); // Navigate to the register page
    };

    return (
        <View style={styles.container}>
            <h1>Sign In</h1>

            <View style={styles.iconContainer}>
                <MaterialIcons name="person" size={40} color="blue" />
            </View>

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry // replaces the password text with dots for added security
            />

            <Text>Forgot Password?</Text>
            <Button title="Sign In" onPress={() => navigateToMain()} /> {/** TODO: switch to account verification */}

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
