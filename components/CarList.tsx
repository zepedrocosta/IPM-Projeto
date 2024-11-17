import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";

type Car = {
  url: string;
  brand: string;
  model: string;
  year: number;
  plate: string;
};

type CarListProps = {
  searchQuery: string;
};

const CarList: React.FC<CarListProps> = ({ searchQuery }) => {
  const initialState: Car[] = [
    {
      url: "https://upload.wikimedia.org/wikipedia/pt/c/c2/Peter_Griffin.png",
      brand: "FORD",
      model: "MUSTANG MACH 1",
      year: 1969,
      plate: "XX-01-XX",
    },
    {
      url: "https://upload.wikimedia.org/wikipedia/pt/c/c2/Peter_Griffin.png",
      brand: "FORD",
      model: "MUSTANG MACH 1",
      year: 1969,
      plate: "XX-01-XX",
    },
    {
      url: "https://upload.wikimedia.org/wikipedia/pt/c/c2/Peter_Griffin.png",
      brand: "FORD",
      model: "MUSTANG MACH 1",
      year: 1969,
      plate: "XX-01-XX",
    },
  ];

  const [carList, setCarList] = useState<Car[]>(initialState);
  const [showPopup, setShowPopup] = useState(false);
  const [newCar, setNewCar] = useState<Car>({
    url: "",
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    plate: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCar((prevCar) => ({
      ...prevCar,
      [name]: name === "year" ? parseInt(value) : value,
    }));
  };

  const showPopupWindow = () => {
    setShowPopup(true);
  };

  const handleAddCar = () => {
    setCarList((prevList) => [...prevList, newCar]);
    setShowPopup(false);
    setNewCar({
      url: "",
      brand: "",
      model: "",
      year: new Date().getFullYear(),
      plate: "",
    });
  };

  const router = useRouter();

  const navigateToCarPage = () => {
    router.push("/car");
  };

  const handleModelChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewCar((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
            <Image source={{ uri: car.url }} style={styles.image} />
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
        onPress={showPopupWindow}
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
            <input
              type="text"
              name="url"
              placeholder="Image URL"
              value={newCar.url}
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                marginBottom: "10px",
                fontSize: "16px",
              }}
            />
            <select
              name="brand"
              value={newCar.brand}
              onChange={handleModelChange}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                marginBottom: "10px",
                fontSize: "16px",
              }}
            >
              <option value="" disabled>
                Select a brand
              </option>
              {[
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
              ].map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="model"
              placeholder="Model"
              value={newCar.model}
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                marginBottom: "10px",
                fontSize: "16px",
              }}
            />
            <input
              type="number"
              name="year"
              placeholder="Year"
              value={newCar.year}
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                marginBottom: "10px",
                fontSize: "16px",
              }}
            />
            <input
              type="text"
              name="plate"
              placeholder="Plate"
              value={newCar.plate}
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                marginBottom: "10px",
                fontSize: "16px",
              }}
            />
            <View
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 16,
              }}
            >
              <button
                onClick={handleAddCar}
                style={{
                  flex: 1,
                  backgroundColor: "#28a745",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "10px",
                  fontSize: "16px",
                  marginRight: "8px",
                  cursor: "pointer",
                }}
              >
                Add
              </button>
              <button
                onClick={() => setShowPopup(false)}
                style={{
                  flex: 1,
                  backgroundColor: "#dc3545",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "10px",
                  fontSize: "16px",
                  marginLeft: "8px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
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
});

export default CarList;
