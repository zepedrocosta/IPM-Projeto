import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Car = {
  imageURL: string;
  brand: string;
  model: string;
  year: string;
  plate: string;
};

const Car: React.FC = () => {
  const params = useLocalSearchParams();
  AsyncStorage.setItem("car", JSON.stringify(params));
  const [image, setImage] = useState<string>(
    "https://as1.ftcdn.net/v2/jpg/04/62/93/66/1000_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg"
  );

  AsyncStorage.getItem("image").then((value) => {
    if (value && value !== "") setImage(value!);
  });

  const [car, setCar] = useState<Car>({
    imageURL: image,
    brand: params.brand.toString(),
    model: params.model.toString(),
    year: params.year.toString(),
    plate: params.plate.toString(),
  });

  const navigateToDocuments = () => {
    router.push("/documents");
  };

  const navigateToLocation = () => {
    router.push("/location");
  };

  const navigateToServices = () => {
    router.push({
      pathname: "/services",
      params: {
        imageURL: car.imageURL,
        brand: car.brand,
        model: car.model,
        year: car.year.toString(),
        plate: car.plate,
      },
    });
  };

  const navigateToMain = () => {
    router.back();
  };

  const navigateToStats = () => {
    router.push("/main");
  };

  const navigateToTrackRecords = () => {
    router.push("/main");
  };

  const CustomButton = ({
    title,
    onPress,
  }: {
    title: string;
    onPress: () => void;
  }) => (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
      <AntDesign
        style={styles.rightArrow}
        name="right"
        size={24}
        color="black"
      />
    </Pressable>
  );

  return (
    <View style={{ marginTop: 30 }}>
      <AntDesign
        name="left"
        size={24}
        style={styles.backButton}
        onPress={navigateToMain}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Image source={{ uri: image }} style={{ height: 160, width: 160 }} />
        <View style={styles.carBrandModel}>
          <Text>
            {car.brand} {car.model}
          </Text>
        </View>
        <View style={styles.carPlate}>
          <Text>{car.plate}</Text>
        </View>
      </View>
      <View style={styles.carMain}>
        <View style={styles.carGroupingContainer}>
          <Text style={{ marginBottom: 0 }}>Info</Text>
          <View style={styles.carButtonLess}>
            <CustomButton title="Location" onPress={navigateToLocation} />
          </View>
          <View style={styles.carButton}>
            <CustomButton title="Services" onPress={navigateToServices} />
          </View>
          <View style={styles.carButton}>
            <CustomButton title="Documents" onPress={navigateToDocuments} />
          </View>
        </View>
        <View style={styles.carGroupingContainer}>
          <Text style={{ marginBottom: 0, marginTop: 23 }}>Performance</Text>
          <View style={styles.carButtonLess}>
            <CustomButton title="Stats" onPress={navigateToStats} />
          </View>
          <View style={styles.carButton}>
            <CustomButton
              title="Track Records"
              onPress={navigateToTrackRecords}
            />
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
  backButton: {
    padding: 20,
    marginTop: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "rgba(33,150,243,1.00)",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 2,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  buttonText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  arrow: {
    width: "auto",
    textAlignVertical: "center",
  },
  rightArrow: {
    color: "#fff",
  },
});
