import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { DefaultTopBar } from '../components/DefaultTopBar';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // Use the expo-router hook for navigation

export default function HomePage() {
  const router = useRouter(); // Use the router hook for navigation

  const navigateToRegister = () => {
    router.push('/'); // Navigate to the register page
  };

  return (
    <DefaultTopBar
      leftComponent={<MaterialIcons name="menu" size={24} />}
      children={<Text style={styles.topText}>My Cars</Text>}
      body={<Text>Welcome to the home page!</Text>}
      rightComponent={<MaterialIcons name="search" size={24} onPress={navigateToRegister} />}
    />
  );
}

const styles = StyleSheet.create({
  topText: {
    fontSize: 25,
  },
});
