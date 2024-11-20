import React, { useState, useEffect, Fragment } from "react";
import { Text, StyleSheet } from "react-native";
import { DefaultTopBar } from "@/components/DefaultTopBar";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router"; // Use the expo-router hook for navigation
import Documents from "@/components/Documents";
import Car from "../car";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DocumentPage() {
  const router = useRouter();


    const [car, setCar] = useState<Car>();

    useEffect(() => {
        AsyncStorage.getItem("car").then((value) => {
            setCar(JSON.parse(value!));
        });
    }, []);
    

  const navigateToCarPage = () => {
    if (car) {
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
    }
  };

  return (
    <Fragment>
      {car && (
        <DefaultTopBar
          leftComponent={
            <AntDesign name="left" size={24} />
          }
          children={<Text style={styles.topText}>Documents</Text>}
          body={<Documents car={car} />}
        />
      )}
    </Fragment>
  );
}

const styles = StyleSheet.create({
  topText: {
    fontSize: 25,
  },
});
