import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";
import { DefaultTopBar } from "@/components/DefaultTopBar";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router"; // Use the expo-router hook for navigation
import Location from "@/components/Location";
import Car from "../car";

export default function LocationPage() {
  const params = useLocalSearchParams();

  const [car, setCar] = useState<Car>({
    imageURL: params.imageURL.toString(),
    brand: params.brand.toString(),
    model: params.model.toString(),
    year: params.year.toString(),
    plate: params.plate.toString(),
  });

  const router = useRouter(); // Use the router hook for navigation

  const navigateToCarPage = () => {
    router.push({
      pathname: "/car",
      params: {
        imageURL: car.imageURL,
        brand: car.brand,
        model: car.model,
        year: car.year,
        plate: car.plate,
      },
    });
  };

  return (
    <DefaultTopBar
      leftComponent={
        <AntDesign name="left" size={24} onPress={navigateToCarPage} />
      }
      children={
        <Text style={styles.topText}>
          {car.brand} {car.model}
        </Text>
      }
      body={<Location car={car} />}
    />
  );
}

const styles = StyleSheet.create({
  topText: {
    fontSize: 23,
  },
});
