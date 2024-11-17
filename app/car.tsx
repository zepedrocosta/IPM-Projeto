import { router } from "expo-router";
import React, { useState } from "react";
import { Button, StyleSheet, View, Text } from "react-native";

type Car = {
  url: string;
  brand: string;
  model: string;
  year: number;
  plate: string;
};

const Car: React.FC = () => {
  const [car, setCar] = useState<Car>({
    url: "https://upload.wikimedia.org/wikipedia/pt/c/c2/Peter_Griffin.png",
    brand: "FORD",
    model: "MUSTANG MACH 1",
    year: 1969,
    plate: "XX-01-XX",
  });

  const navigateToDocuments = () => {
    router.push("/documents"); // Navigate to the register page
  };

  const navigateToServices = () => {
    router.push("/services");
  };

  return (
    <View style={{ marginTop: 30 }}>
      {" "}
      {/**TODO: fix scrolls */}
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img src={car.url} height="160px" />
        <View style={styles.carBrandModel}>
          {car.brand} {car.model}
        </View>
        <View style={styles.carPlate}>{car.plate}</View>
      </View>
      <View style={styles.carMain}>
        <View style={styles.carGroupingContainer}>
          <Text style={{ marginBottom: 0 }}>Info</Text>
          <View style={styles.carButtonLess}>
            <Button title="Location" />
          </View>
          <View style={styles.carButton}>
            <Button title="Services" onPress={navigateToServices} />
          </View>
          <View style={styles.carButton}>
            <Button title="Documents" onPress={navigateToDocuments} />
          </View>
        </View>
        <View style={styles.carGroupingContainer}>
          <p style={{ marginBottom: "0", marginTop: "23px" }}>Performance</p>
          <View style={styles.carButtonLess}>
            <Button title="Stats" />
          </View>
          <View style={styles.carButton}>
            <Button title="Track Records" />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Car;

const styles = StyleSheet.create({
  carMain: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 30,
  },
  carButton: {
    padding: 10,
    width: 190,
    fontSize: 15,
  },
  carButtonLess: {
    marginTop: 5,
    padding: 10,
    width: 190,
    fontSize: 15,
  },
  carGroupingContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  carBrandModel: {
    marginBottom: 8,
    fontSize: 25,
    fontWeight: "bold",
    color: "#333",
    marginTop: 5,
  },
  carPlate: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    fontSize: 22,
    backgroundColor: "#f9f9f9",
    width: "auto",
    marginTop: 5,
  },
});
