import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { DefaultTopBar } from '@/components/DefaultTopBar';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // Use the expo-router hook for navigation
import ScheduleInspection from '@/components/ScheduleInspection';

export default function DocumentPage() {
  const router = useRouter(); // Use the router hook for navigation

  const navigateToServices = () => {
    router.push('/services'); // Navigate to the register page
  };

  return (
    <DefaultTopBar
      leftComponent={<MaterialIcons name="arrow-left" size={24} onPress={navigateToServices} />}
      children={<Text style={styles.topText}>Schedule Inspection</Text>}
      body={<ScheduleInspection />}
    />
  );
}

const styles = StyleSheet.create({
  topText: {
    fontSize: 25,
  },
});
