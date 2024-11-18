import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { httpGet, httpPost } from "@/utils/http";

type Car = {
  imageURL: string;
  brand: string;
  model: string;
  year: number;
  plate: string;
};

type CarForm = {
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

  const initalNewCar: CarForm = {
    brand: "",
    model: "",
    year: new Date().getFullYear().toString(),
    plate: "",
  };

  const [carList, setCarList] = useState<Car[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newCar, setNewCar] = useState<CarForm>(initalNewCar);

  useEffect(() => {
    httpGet("/cars").then(
      (response: any) => {
        setCarList(response.data);
      },
      (err) => {
        console.error(err);
      }
    );
  }, []);

  const handleAddCar = () => {
    httpPost("/cars", { ...newCar, year: parseInt(newCar.year) }).then(
      (res: any) => {
        setCarList([
          ...carList,
          {
            ...newCar,
            year: parseInt(newCar.year),
            imageURL: res.data.imageURL,
          },
        ]);
        setNewCar(initalNewCar);
        setShowPopup(false);
      },
      (err) => {
        console.error(err);
      }
    );
  };

  const router = useRouter();

  const navigateToCarPage = () => {
    router.push("/car");
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
      <View style={styles.secondary}>
        {filteredCarList.length === 0 && (
          <View style={styles.carList}>
            <Text style={styles.noCarFoundText}>No cars found</Text>
            <Text style={styles.addACarText}>Add a car to get started!</Text>
          </View>
        )}

        {filteredCarList.map((car, index) => (
          <TouchableOpacity
            key={index}
            style={styles.carObject}
            onPress={navigateToCarPage}
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
                  <Text>{car.plate}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.addButton}
        activeOpacity={0.7}
        onPress={() => setShowPopup(true)}
      >
        <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 36 }}>
          +
        </Text>
      </TouchableOpacity>

      {showPopup && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              padding: 20,
              borderRadius: 12,
              width: 320,
              //boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.15)",
            }}
          >
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
            {/*<TextInput
              placeholder="Image URL"
              value={newCar.url}
              onChangeText={(value) => setNewCar({ ...newCar, url: value })}
              style={styles.formInput}
            />
            TODO: Change to Image input (MultipartFile)*/}

            <View style={styles.container}>
              <Picker
                selectedValue={newCar.brand}
                onValueChange={(value) =>
                  setNewCar({ ...newCar, brand: value })
                }
                style={styles.picker}
              >
                <Picker.Item label="Select a brand" value="" enabled={false} />
                {brands.map((brand) => (
                  <Picker.Item key={brand} label={brand} value={brand} />
                ))}
              </Picker>
            </View>

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
              <TouchableOpacity style={styles.addButton} onPress={handleAddCar}>
                <Text>Add</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.addButton}
                onPress={() => setShowPopup(false)}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    position: "relative",
    minHeight: "100%",
    backgroundColor: "#f5f5f5",
  },
  secondary: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    maxHeight: "80%",
    overflow: "scroll",
  },
  carList: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%", // Ensure it takes full container height
    textAlign: "center", // Optional for multi-line messages
    color: "#555", // Customize as needed
  },
  noCarFoundText: { fontSize: 18, fontWeight: "bold" },
  addACarText: { fontSize: 14, color: "#777" },
  carObject: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    //boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    padding: 16,
    cursor: "pointer",
    //transition: "transform 0.2s, box-shadow 0.2s",
  },
  carBrand: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 8,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  carModel: { color: "#777", fontSize: 16, marginBottom: 8 },
  carPlate: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    fontSize: 14,
    backgroundColor: "#f9f9f9",
    width: 100,
  },
  addButton: {
    backgroundColor: "#3399ff",
    width: 200,
    minHeight: 60,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
    objectFit: "cover",
  },
  formInput: {
    width: "100%",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10,
    fontSize: 16,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#dc3545",
    color: "#fff",
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginLeft: 8,
    cursor: "pointer",
  },
  addButton2: {
    flex: 1,
    backgroundColor: "#28a745",
    color: "#fff",
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginLeft: 8,
    cursor: "pointer",
  },
  container: {
    margin: 16,
  },
  picker: {
    height: 50,
    width: "100%",
  },
});

export default CarList;
