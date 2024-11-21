import React, { useState, useEffect, Fragment } from "react";
import { Text, StyleSheet } from "react-native";
import { DefaultTopBar } from "@/components/DefaultTopBar";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router"; // Use the expo-router hook for navigation
import DocumentsList from "@/components/DocumentsList";
import Car from "../car";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DocumentPage() {
  const router = useRouter();

  const [car, setCar] = useState<Car>({
    imageURL: "",
    brand: "",
    model: "",
    year: "",
    plate: "",
  });

  useEffect(() => {
    AsyncStorage.getItem("car").then((value) => {
      setCar(JSON.parse(value!));
    });
  }, []);

  const navigateToCarPage = () => {
    router.back();
  };

  return (
    <DefaultTopBar
      leftComponent={
        <AntDesign name="left" size={24} onPress={navigateToCarPage} />
      }
      children={<Text style={styles.topText}>Documents</Text>}
      body={<DocumentsList car={car} />}
    />
  );
}

const styles = StyleSheet.create({
  topText: {
    fontSize: 25,
  },
});
