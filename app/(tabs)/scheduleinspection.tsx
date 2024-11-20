import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";
import { DefaultTopBar } from "@/components/DefaultTopBar";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router"; // Use the expo-router hook for navigation
import { useLocalSearchParams } from "expo-router";
import ScheduleInspection from "@/components/ScheduleInspection";
import Car from "@/app/car";

export default function ScheduleInspectionTab() {
  const params = useLocalSearchParams();
  const router = useRouter(); // Use the router hook for navigation

  const navigateToServices = () => {
    router.push("/services"); // Navigate to the register page
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
        <MaterialIcons
          name="arrow-left"
          size={24}
          onPress={navigateToServices}
        />
      }
      children={<Text style={styles.topText}>Schedule Inspection</Text>}
      body={<ScheduleInspection car={car} />}
    />
  );
}

const styles = StyleSheet.create({
  topText: {
    fontSize: 25,
  },
});
