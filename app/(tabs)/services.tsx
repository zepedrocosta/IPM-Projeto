import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { DefaultTopBar } from '@/components/DefaultTopBar';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // Use the expo-router hook for navigation
import Services from '@/components/Services';

export default function DocumentPage() {
  const router = useRouter(); // Use the router hook for navigation

  const navigateToRegister = () => {
    router.push('/main'); // Navigate to the register page
  };

  return (
    <DefaultTopBar
      leftComponent={<MaterialIcons name="arrow-left" size={24} />}
      children={<Text style={styles.topText}>Services</Text>}
      body={<Services />}
    />
  );
}

const styles = StyleSheet.create({
  topText: {
    fontSize: 25,
  },
});
