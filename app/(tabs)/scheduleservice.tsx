import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";
import { DefaultTopBar } from "@/components/DefaultTopBar";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router"; // Use the expo-router hook for navigation
import { useLocalSearchParams } from "expo-router";
import ScheduleService from "@/components/ScheduleService";
import Car from "@/app/car";

export default function ScheduleInspectionTab() {
  const params = useLocalSearchParams();
  const router = useRouter(); // Use the router hook for navigation

  const navigateToServices = () => {
    router.back();
  };

  const [car, setCar] = useState<Car>({
    imageURL: params.imageURL.toString(),
    brand: params.brand.toString(),
    model: params.model.toString(),
    year: params.year.toString(),
    plate: params.plate.toString(),
  });

  return (
    <DefaultTopBar
      leftComponent={
        <AntDesign name="left" size={24} onPress={navigateToServices} style={styles.backButton} />
      }
      children={<Text style={styles.topText}>Schedule Service</Text>}
      body={<ScheduleService car={car} />}
    />
  );
}

const styles = StyleSheet.create({
  topText: {
    fontSize: 25,
  },
  backButton: {
    color: "#007aff",
  },
});
