import React, { useState, useEffect, Fragment } from "react";
import { Text, StyleSheet } from "react-native";
import { DefaultTopBar } from "@/components/DefaultTopBar";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router"; // Use the expo-router hook for navigation
import Location from "@/components/Location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Car from "../car";

export default function LocationPage() {
  const params = useLocalSearchParams();

  const [car, setCar] = useState<Car>();

  useEffect(() => {
    AsyncStorage.getItem("car").then((value) => {
      setCar(JSON.parse(value!));
    });
  }, []);

  const router = useRouter(); // Use the router hook for navigation

  const navigateToCarPage = () => {
    router.back();
  };

  return (
    <Fragment>
      {car && (
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
      )}
    </Fragment>
  );
}

const styles = StyleSheet.create({
  topText: {
    fontSize: 23,
  },
});
