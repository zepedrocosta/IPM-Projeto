import { useRouter } from "expo-router";
import React, { Fragment, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Pressable,
  Modal,
  ToastAndroid,
  ScrollView,
  Keyboard,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { httpGet, httpPost } from "@/utils/http";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";

type Car = {
  brand: string;
  model: string;
  year: string;
  plate: string;
  imageURL: string;
};

type CarListProps = {
  searchQuery: string;
};

const brands = [
  "Acura",
  "Alfa Romeo",
  "Aston Martin",
  "Audi",
  "Bentley",
  "BMW",
  "Bugatti",
  "Buick",
  "Cadillac",
  "Chevrolet",
  "Chrysler",
  "Citroën",
  "Dodge",
  "Ferrari",
  "Fiat",
  "Ford",
  "Genesis",
  "GMC",
  "Honda",
  "Hyundai",
  "Infiniti",
  "Jaguar",
  "Jeep",
  "Kia",
  "Lamborghini",
  "Land Rover",
  "Lexus",
  "Lincoln",
  "Maserati",
  "Mazda",
  "McLaren",
  "Mercedes-Benz",
  "Mini",
  "Mitsubishi",
  "Nissan",
  "Peugeot",
  "Porsche",
  "Ram",
  "Renault",
  "Rolls-Royce",
  "Rover",
  "Saab",
  "Seat",
  "Skoda",
  "Subaru",
  "Suzuki",
  "Tesla",
  "Toyota",
  "Volkswagen",
  "Volvo",
  "Other",
];

const initalNewCar: Car = {
  brand: "",
  model: "",
  year: "",
  plate: "",
  imageURL: "",
};

const CarList: React.FC<CarListProps> = ({ searchQuery }) => {
  const router = useRouter();
  const [carList, setCarList] = useState<Car[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newCar, setNewCar] = useState<Car>(initalNewCar);
  const [loading, setLoading] = useState(true);
  const [loadingAddCar, setLoadingAddCar] = useState(false);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      ToastAndroid.show(
        "Permission to access gallery is required!",
        ToastAndroid.LONG
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setNewCar((prevCar) => ({
        ...prevCar,
        imageURL: result.assets[0].base64 || "",
      }));
    }
  };

  useEffect(() => {
    httpGet("/cars").then(
      (response: any) => {
        setCarList(response.data);
        setLoading(false);
      },
      (err) => {
        console.error(err);
      }
    );
  }, []);

  const handleAddCar = () => {
    Keyboard.dismiss();
    if (newCar.year !== "" && parseInt(newCar.year) < 1885) {
      ToastAndroid.show("Year must be greater than 1885", ToastAndroid.LONG);
    } else if (newCar.year !== "" && parseInt(newCar.year) > 2200) {
      ToastAndroid.show("Year must be less than 2200", ToastAndroid.LONG);
    } else if (
      newCar.plate.length > 0 &&
      !/^[A-Za-z0-9]{2}-[A-Za-z0-9]{2}-[A-Za-z0-9]{2}$/.test(newCar.plate)
    ) {
      ToastAndroid.show("Invalid plate format", ToastAndroid.LONG);
    } else {
      addCar();
    }
  };

  const addCar = () => {
    setLoadingAddCar(true);
    httpPost("/cars", {
      ...newCar,
      year: parseInt(newCar.year),
      plate: newCar.plate.toUpperCase(),
    }).then(
      (res: any) => {
        setCarList([
          ...carList,
          {
            ...newCar,
            plate: newCar.plate.toUpperCase(),
          },
        ]);
        setNewCar(initalNewCar);
        setShowPopup(false);
        setLoadingAddCar(false);
      },
      (error) => {
        const regex409 = /409/;
        const regex400 = /400/;
        if (regex409.test(error.message)) {
          ToastAndroid.show(
            "Plate already registered. If this is an error, contact support",
            ToastAndroid.LONG
          );
        } else if (regex400.test(error.message)) {
          ToastAndroid.show(
            "Please fill all fields before submitting",
            ToastAndroid.LONG
          );
        } else {
          ToastAndroid.show(error.toString(), ToastAndroid.LONG);
        }
        setLoadingAddCar(false);
      }
    );
  };

  const navigateToCarPage = (car: Car) => {
    let img = "";

    if (car.imageURL) {
      img = "data:image/png;base64," + car.imageURL;
    }

    //AsyncStorage.setItem("image", img);
    if (car.imageURL) {
      img = "data:image/png;base64," + car.imageURL;
      const cachePath = `${FileSystem.cacheDirectory}${car.plate}.png`;

      try {
        FileSystem.writeAsStringAsync(cachePath, car.imageURL, {
          encoding: FileSystem.EncodingType.Base64,
        }).then(() => {
          img = cachePath;
        });
      } catch (error) {
        console.log("Error saving image to cache:", error);
      }
    }

    router.push({
      pathname: "/car",
      params: {
        imageURL: "",
        brand: car.brand,
        model: car.model,
        year: car.year.toString(),
        plate: car.plate,
      },
    });
  };

  const filteredCarList = carList.filter((car) => {
    const lowercasedQuery = searchQuery.toLowerCase();
    return (
      car.brand.toLowerCase().includes(lowercasedQuery) ||
      car.model.toLowerCase().includes(lowercasedQuery) ||
      car.plate.toLowerCase().includes(lowercasedQuery) ||
      car.year.toString().toLowerCase().includes(lowercasedQuery)
    );
  });

  return (
    <View style={styles.main}>
      <Modal transparent={true} visible={showPopup} animationType="fade">
        <View style={styles.addCarContainer}>
          <View style={styles.addCar}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 16,
                textAlign: "center",
                color: "#333",
              }}
            >
              Add New Car
            </Text>
            <View>
              <Pressable style={styles.button} onPress={pickImage}>
                <Text style={styles.buttonText}>
                  {newCar.imageURL ? "Change Image" : "Pick an Image"}
                </Text>
              </Pressable>

              <Picker
                selectedValue={newCar.brand}
                onValueChange={(value) =>
                  setNewCar({ ...newCar, brand: value })
                }
                style={styles.formInput}
              >
                {newCar.brand === "" && (
                  <Picker.Item
                    label="Select a brand*"
                    value=""
                    enabled={false}
                  />
                )}
                {brands.map((brand) => (
                  <Picker.Item key={brand} label={brand} value={brand} />
                ))}
              </Picker>
            </View>

            <TextInput
              placeholder="Model*"
              value={newCar.model}
              onChangeText={(value) => setNewCar({ ...newCar, model: value })}
              style={styles.formInput}
            />
            <TextInput
              keyboardType="numeric"
              placeholder="Year*"
              value={newCar.year}
              onChangeText={(value) => setNewCar({ ...newCar, year: value })}
              style={styles.formInput}
            />
            <TextInput
              placeholder="Plate*"
              value={newCar.plate}
              onChangeText={(value) => setNewCar({ ...newCar, plate: value })}
              style={styles.formInput}
            />
            {newCar.plate.length > 0 &&
              !/^[A-Za-z0-9]{2}-[A-Za-z0-9]{2}-[A-Za-z0-9]{2}$/.test(
                newCar.plate
              ) && (
                <View style={styles.validationContainer}>
                  <Text style={styles.textHelp}>Plate format must be: </Text>
                  <Text style={styles.textWeak}>XX-XX-XX</Text>
                </View>
              )}
            <View
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 16,
              }}
            >
              <Fragment>
                {loadingAddCar ? (
                  <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>
                      Adding car, please wait
                    </Text>
                  </Pressable>
                ) : (
                  <Pressable style={styles.button} onPress={handleAddCar}>
                    <Text style={styles.buttonText}>Add</Text>
                  </Pressable>
                )}
              </Fragment>

              <Pressable
                style={styles.cancelButton}
                onPress={() => {
                  setShowPopup(false);
                  setNewCar({ ...newCar, brand: "" });
                }}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {loading ? (
        <View style={styles.noCarsFound}>
          <Text style={styles.noCarFoundText}>Loading...</Text>
          <Text style={styles.addACarText}>Fetching car info</Text>
        </View>
      ) : (
        <Fragment>
          {filteredCarList.length === 0 && (
            <View style={styles.noCarsFound}>
              <Text style={styles.noCarFoundText}>No cars found</Text>
              <Text style={styles.addACarText}>Add a car to get started!</Text>
            </View>
          )}
        </Fragment>
      )}

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
        {filteredCarList.map((car, index) => (
          <TouchableOpacity
            key={index}
            style={styles.carObject}
            onPress={() => navigateToCarPage(car)}
          >
            <Image
              source={{
                uri: car.imageURL
                  ? "data:image/png;base64," + car.imageURL
                  : "https://as1.ftcdn.net/v2/jpg/04/62/93/66/1000_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg",
              }}
              style={styles.image}
            />
            <View style={{ flex: 1 }}>
              <View style={styles.carBrand}>
                <Text style={styles.carBrandText}>{car.brand}</Text>
                <Text style={{ color: "#555" }}>{car.year}</Text>
              </View>
              <View style={styles.carModel}>
                <Text>{car.model}</Text>
              </View>
              <View
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <View style={styles.carPlate}>
                  <Text style={styles.carPlateText}>{car.plate}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        activeOpacity={0.7}
        onPress={() => setShowPopup(true)}
      >
        <MaterialIcons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingHorizontal: 16,
    width: "95%",
  },
  list: {
    flex: 1,
    //marginBottom: 60,
  },
  addCarContainer: {
    position: "absolute",
    top: 0,
    right: -100,
    left: -100,
    bottom: 0,
    zIndex: 1265,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  addCar: {
    width: 335,
    padding: 20,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    borderRadius: 10,
  },
  button: {
    backgroundColor: "rgba(33,150,243,1.00)",
    paddingVertical: 10,
    borderRadius: 2,
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 20,
    borderColor: "black",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  cancelButton: {
    backgroundColor: "red",
    paddingVertical: 10,
    borderRadius: 2,
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    borderColor: "black",
  },
  buttonText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    borderColor: "black",
    borderRadius: 2,
  },
  noCarsFound: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  noCarFoundText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  scroll: {
    maxHeight: "90%",
  },
  addACarText: {
    fontSize: 14,
    color: "#777",
    marginTop: 8,
  },
  carObject: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  image: {
    width: 120,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  carBrand: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  carBrandText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  carModel: {
    color: "#777",
    fontSize: 16,
    marginBottom: 8,
  },
  carPlate: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  carPlateText: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    backgroundColor: "#f9f9f9",
    fontSize: 14,
    textAlign: "center",
  },
  formInput: {
    width: "100%",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 15,
    fontSize: 16,
  },
  addButton: {
    position: "absolute",
    right: 10,
    bottom: 20,
    backgroundColor: "rgba(33,150,243,1.00)",
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  validationContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "80%",
    marginBottom: 12,
  },
  textHelp: {
    fontSize: 16,
    color: "gray",
  },
  textWeak: {
    fontSize: 16,
    color: "black",
  },
});

export default CarList;
