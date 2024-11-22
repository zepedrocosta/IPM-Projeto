import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import * as FileSystem from "expo-file-system";

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

  /*AsyncStorage.getItem("image").then((value) => {
        if (value && value !== "") setImage(value!);
    });*/

  const [car, setCar] = useState<Car>({
    imageURL: image,
    brand: params.brand.toString(),
    model: params.model.toString(),
    year: params.year.toString(),
    plate: params.plate.toString(),
  });

  useEffect(() => {
    const cachePath = `${FileSystem.cacheDirectory}${params.plate}.png`;
    FileSystem.getInfoAsync(cachePath).then((fileInfo) => {
      if (fileInfo.exists) {
        setImage(cachePath);
      }
    });
  }, []);

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

  const handleEdit = () => {
    router.push({
      pathname: "/(tabs)/edit",
      params: {
        url: car.imageURL,
        brand: car.brand,
        model: car.model,
        year: car.year,
        plate: car.plate,
      },
    });
  };

  const navigateToStats = () => {
    router.push({
      pathname: "/(tabs)/stats",
      params: {
        url: car.imageURL,
        brand: car.brand,
        model: car.model,
        year: car.year,
        plate: car.plate,
      },
    });
  };

  const navigateToTrackRecords = () => {
    router.push({
      pathname: "/(tabs)/trackHistory",
      params: {
        url: car.imageURL,
        brand: car.brand,
        model: car.model,
        year: car.year,
        plate: car.plate,
      },
    });
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
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topView}>
          <AntDesign
            name="left"
            size={24}
            style={styles.backButton}
            onPress={navigateToMain}
          />
          <Text style={styles.carBrandText}>{car.brand}</Text>
          <MaterialIcons
            name="edit"
            size={24}
            style={styles.editButton}
            onPress={handleEdit}
          />
        </View>
        <View style={styles.carInfoContainer}>
          <Image source={{ uri: image }} style={{ height: 160, width: 160 }} />
          <View style={styles.carBrand}>
            <Text style={styles.carBrandText}>{car.model}</Text>
          </View>
          <View style={styles.carPlate}>
            <Text style={styles.carPlateText}>{car.plate}</Text>
          </View>
        </View>
        <View style={styles.carMain}>
          <View style={styles.carGroupingContainer}>
            <Text style={styles.infoTitle}>Info</Text>
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
          <View style={styles.carGroupingContainerEnd}>
            <Text style={styles.performanceTitle}>Performance</Text>
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default Car;

const styles = StyleSheet.create({
  carMain: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20,
  },
  topView: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
  },
  carInfoContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 15,
  },
  carBrand: {
    marginBottom: 8,
    marginTop: 5,
  },
  carBrandText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#333",
  },
  carBrandTextTop: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#333",
  },
  carBrandModel: {
    marginBottom: 8,
  },
  carPlate: {
    padding: 8,
    paddingBottom: 4,
    paddingTop: 4,
    marginTop: 5,
  },
  carPlateText: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    backgroundColor: "#f9f9f9",
    fontSize: 16,
    textAlign: "center",
  },
  optionsContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 30,
  },
  image: {
    borderRadius: 15,
    height: 160,
    width: "100%",
    maxWidth: 390,
    resizeMode: "cover",
  },
  carButton: {
    padding: 15,
    width: "80%",
    fontSize: 20,
  },
  carButtonLess: {
    marginTop: 5,
    padding: 15,
    width: "80%",
    fontSize: 25,
  },
  carGroupingContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  carGroupingContainerEnd: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 20,
  },
  infoTitle: {
    marginBottom: 0,
    fontSize: 25,
  },
  performanceTitle: {
    marginBottom: 0,
    marginTop: 23,
    fontSize: 25,
  },
  backButton: {
    padding: 22,
    color: "#007aff",
  },
  editButton: {
    padding: 22,
    color: "#005bb5",
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
