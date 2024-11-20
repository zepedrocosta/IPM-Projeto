import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from "expo-image-picker";

type Car = {
  imageURL: string;
  brand: string;
  model: string;
  year: number;
  plate: string;
};

type CarForm = {
  imageURL: string;
  brand: string;
  model: string;
  year: string;
  plate: string;
};

type CarListProps = {
  searchQuery: string;
};

const CarList: React.FC<CarListProps> = ({ searchQuery }) => {
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
    "Saab",
    "Subaru",
    "Suzuki",
    "Tesla",
    "Toyota",
    "Volkswagen",
    "Volvo",
  ];

  const initialNewCar: CarForm = {
    imageURL: "",
    brand: "",
    model: "",
    year: new Date().getFullYear().toString(),
    plate: "",
  };

  const [carList, setCarList] = useState<Car[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newCar, setNewCar] = useState<CarForm>(initialNewCar);

  const loadCarsFromCache = async () => {
    try {
      const storedCars = await AsyncStorage.getItem("carList");
      if (storedCars) {
        setCarList(JSON.parse(storedCars));
      }
    } catch (error) {
      console.error("Error loading cars from cache:", error);
    }
  };

  useEffect(() => {
    loadCarsFromCache();
  }, []);

  useEffect(() => {
    const saveCarsToCache = async () => {
      try {
        await AsyncStorage.setItem("carList", JSON.stringify(carList));
      } catch (error) {
        console.error("Error saving cars to cache:", error);
      }
    };

    if (carList.length > 0) {
      saveCarsToCache();
    }
  }, [carList]);

  const handleAddCar = () => {
    const carToAdd: Car = {
      imageURL: newCar.imageURL !== "" ? newCar.imageURL : "https://example.com/car.jpg",
      brand: newCar.brand,
      model: newCar.model,
      year: parseInt(newCar.year),
      plate: newCar.plate,
    };
    console.log(carToAdd.imageURL)

    setCarList((prevList) => [...prevList, carToAdd]);

    setNewCar(initialNewCar);
    setShowPopup(false);
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access gallery is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const fileUri = result.assets[0].uri;

      try {
        const fileName = fileUri.split('/').pop();
        if (!fileName) {
          throw new Error('File name could not be extracted');
        }

        const cacheDirectory = FileSystem.cacheDirectory;
        if (!cacheDirectory) {
          throw new Error('Cache directory is not available');
        }

        const cachedUri = FileSystem.cacheDirectory + fileName;

        await FileSystem.copyAsync({ from: fileUri, to: cachedUri });

        await AsyncStorage.setItem('imageURL', cachedUri);
        console.log("Image saved in cache at:", cachedUri);

        setNewCar((prevCar) => ({
          ...prevCar,
          imageURL: cachedUri,
        }));
      } catch (error) {
        console.error("Error saving image URI to cache:", error);
      }
    }
  };

  const router = useRouter();

  const navigateToCarPage = (car: Car) => {
    router.push({
      pathname: "/car",
      params: {
        url: car.imageURL,
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
      car.plate.toLowerCase().includes(lowercasedQuery)
    );
  });

  return (
    <View style={styles.main}>
      {showPopup && (
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

            <Pressable style={styles.button} onPress={pickImage}>
              <Text style={styles.buttonText}>
                {newCar.imageURL ? "Change Image" : "Pick an Image"}
              </Text>
            </Pressable>

            <TextInput
              placeholder="Brand"
              value={newCar.brand}
              onChangeText={(value) => setNewCar({ ...newCar, brand: value })}
              style={styles.formInput}
            />

            <TextInput
              placeholder="Model"
              value={newCar.model}
              onChangeText={(value) => setNewCar({ ...newCar, model: value })}
              style={styles.formInput}
            />
            <TextInput
              keyboardType="numeric"
              placeholder="Year"
              value={newCar.year}
              onChangeText={(value) => setNewCar({ ...newCar, year: value })}
              style={styles.formInput}
            />
            <TextInput
              placeholder="Plate"
              value={newCar.plate}
              onChangeText={(value) => setNewCar({ ...newCar, plate: value })}
              style={styles.formInput}
            />
            <View
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 16,
              }}
            >
              <Pressable style={styles.button} onPress={handleAddCar}>
                <Text style={styles.buttonText}>Add</Text>
              </Pressable>
              <Pressable style={styles.cancelButton} onPress={() => setShowPopup(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}

      {
        filteredCarList.length === 0 && (
          <View style={styles.noCarsFound}>
            <Text style={styles.noCarFoundText}>No cars found</Text>
            <Text style={styles.addACarText}>Add a car to get started!</Text>
          </View>
        )
      }

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View>
          {filteredCarList.map((car, index) => (
            <TouchableOpacity
              key={index}
              style={styles.carObject}
              onPress={() => navigateToCarPage(car)}
            >
              <Image
                source={{
                  uri:
                    car.imageURL ||
                    "https://as1.ftcdn.net/v2/jpg/04/62/93/66/1000_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg",
                }}
                style={styles.image}
              />
              <View style={{ flex: 1 }}>
                <View style={styles.carBrand}>
                  <Text>{car.brand}</Text>
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
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        activeOpacity={0.7}
        onPress={() => setShowPopup(true)}
      >
        <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 36 }}>
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingHorizontal: 16,
    width: 335
  },
  addCarContainer: {
    position: 'absolute',
    top: 0,
    right: -100,
    left: -100,
    bottom: 0,
    zIndex: 1265,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(225, 225, 225, 0.8)',
  },
  addCar: {
    width: 335,
    top: -70,
    padding: 20,
    backgroundColor: '#c4c4c4',
    borderRadius: 10
  },
  button: {
    backgroundColor: 'rgba(33,150,243,1.00)',
    paddingVertical: 10,
    borderRadius: 2,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 20
  },
  cancelButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    borderRadius: 2,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
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
    maxHeight: '90%'
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
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  carModel: {
    color: "#777",
    fontSize: 16,
    marginBottom: 8,
  },
  carPlate: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    backgroundColor: "#f9f9f9",
  },
  carPlateText: {
    textAlign: 'center'
  },
  formInput: {
    width: "100%",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#fff",
    marginBottom: 15,
    fontSize: 16,
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: -25,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#3399ff",
    alignItems: "center",
  },
});

export default CarList;
