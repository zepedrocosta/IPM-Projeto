import React, { Fragment, useEffect, useState } from "react";
import { Text, StyleSheet } from "react-native";
import { DefaultTopBar } from "@/components/DefaultTopBar";
import { AntDesign } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router"; // Use the expo-router hook for navigation
import Services from "@/components/Services";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Car = {
  imageURL: string;
  brand: string;
  model: string;
  year: string;
  plate: string;
};

export default function ServicesTab() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const [car, setCar] = useState<Car>();

  useEffect(() => {
    AsyncStorage.getItem("car").then((value) => {
      setCar(JSON.parse(value!));
    });
  }, []);

  const navigateToCar = () => {
    router.back();
  };

  return (
    <Fragment>
      {car && (
        <DefaultTopBar
          leftComponent={
            <AntDesign name="left" size={24} onPress={navigateToCar} style={styles.backButton} />
          }
          children={<Text style={styles.topText}>Services</Text>}
          body={<Services car={car} />}
        />
      )}
    </Fragment>
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
