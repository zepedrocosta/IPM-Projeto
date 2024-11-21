import React, { Fragment, useEffect, useState } from "react";
import { Text, StyleSheet } from "react-native";
import { DefaultTopBar } from "@/components/DefaultTopBar";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router"; // Use the expo-router hook for navigation
import TyreService from "@/components/TyreService";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Car = {
  imageURL: string;
  brand: string;
  model: string;
  year: string;
  plate: string;
};

export default function TyreServiceTab() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const [car, setCar] = useState<Car>();

  useEffect(() => {
    AsyncStorage.getItem("car").then((value) => {
      setCar(JSON.parse(value!));
    });
  }, []);

  const navigateToCar = (car: Car) => {
    router.push({
      pathname: "/car",
      params: {
        imageURL:
          car.imageURL ||
          "https://as1.ftcdn.net/v2/jpg/04/62/93/66/1000_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg",
        brand: car.brand,
        model: car.model,
        year: car.year.toString(),
        plate: car.plate,
      },
    });
  };

  return (
    <Fragment>
      {car && <DefaultTopBar
        leftComponent={
          <MaterialIcons
            name="arrow-left"
            size={24}
            onPress={() => navigateToCar(car)}
          />
        }
        children={<Text style={styles.topText}>Tyre Service</Text>}
        body={<TyreService car={car}/>}
      />}
    </Fragment>
  );
}

const styles = StyleSheet.create({
  topText: {
    fontSize: 25,
  },
});
