import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { DefaultTopBar } from '../components/DefaultTopBar';
import { MaterialIcons } from '@expo/vector-icons';

export default function HomePage() {
  return (
    <DefaultTopBar
      leftComponent={<MaterialIcons name="menu" size={24} />}
      children={<Text style={styles.topText}>My Cars</Text>}
      body={<Text>Welcome to the home page!</Text>}
      rightComponent={<MaterialIcons name="search" size={24} />}
    />
  );
}

const styles = StyleSheet.create({
  topText: {
    fontSize: 25,
  },
});
