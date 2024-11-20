import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";
import { DefaultTopBar } from "@/components/DefaultTopBar";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router"; // Use the expo-router hook for navigation
import Documents from "@/components/Documents";
import Car from "../car";

export default function DocumentPage() {
  const params = useLocalSearchParams();
  const router = useRouter();

  /* UNCOMMENT THIS WHEN WE CAN PASS PARAMS
  const [car, setCar] = useState<Car>({
    imageURL: params.imageURL.toString(),
    brand: params.brand.toString(),
    model: params.model.toString(),
    year: params.year.toString(),
    plate: params.plate.toString(),
  });
  
  const navigateToRegister = () => {
    router.push("/main"); // Navigate to the register page
  };

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
  */
  return (
    <DefaultTopBar
      leftComponent={
        <AntDesign name="left" size={24} />
      }
      children={<Text style={styles.topText}>Documents</Text>}
      body={<Documents />}
    />
  );
}

const styles = StyleSheet.create({
  topText: {
    fontSize: 25,
  },
});
