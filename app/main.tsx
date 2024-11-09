import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { DefaultTopBar } from '../components/DefaultTopBar';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // Use the expo-router hook for navigation
import Documents from './(tabs)/documents';

export default function HomePage() {
  const router = useRouter(); // Use the router hook for navigation

  const navigateToRegister = () => {
    router.push('/'); // Navigate to the register page
  };

  return (
    Documents()
  );
}

const styles = StyleSheet.create({
  topText: {
    fontSize: 25,
  },
});
