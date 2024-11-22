import { Car } from "@/types/car";
import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { AntDesign } from "@expo/vector-icons";

interface Location {
  id: string;
  latitude: number;
  longitude: number;
  street: string;
}

interface LocationProps {
  car: Car;
}

export default function Location({ car }: LocationProps) {
  const mapRef = useRef<MapView>(null);

  const [userLocation] = useState({
    latitude: 38.693196,
    longitude: -9.215934,
  });

  const [selectedLocation] = useState<Location>({
    id: "1",
    latitude: 38.659083,
    longitude: -9.204222,
    street: "2825-097 Caparica",
  });

  const focusOnCar = () => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: selectedLocation.latitude,
          longitude: selectedLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000 // Duration in milliseconds
      );
    }
  };

  const focusOnUser = () => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000 // Duration in milliseconds
      );
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: selectedLocation.latitude,
          longitude: selectedLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={userLocation}
          title="User Location"
          description="This is where you are"
        />

        {selectedLocation && (
          <Marker
            pinColor="blue"
            coordinate={{
              latitude: selectedLocation.latitude,
              longitude: selectedLocation.longitude,
            }}
            title="Car Location"
            description={selectedLocation.street}
          />
        )}
      </MapView>

      <View style={styles.addressBox}>
        <Text style={styles.addressText}>
          Car is at: {selectedLocation?.street || "Location not available"}
        </Text>
      </View>

      <View style={styles.navContainer}>
        <TouchableOpacity onPress={focusOnCar} style={styles.carButton}>
          <AntDesign name="car" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={focusOnUser} style={styles.userButton}>
          <AntDesign name="user" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "80%",
  },
  navContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginTop: 25,
  },
  map: {
    height: "60%",
    borderBlockColor: "black",
    borderRadius: 10,
    marginBottom: 20,
  },
  locationMapContainer: {
    display: "flex",
    justifyContent: "center",
    height: "60%",
    marginBottom: 20,
  },
  locationMap: {
    display: "flex",
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  addressBox: {
    height: 50,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  addressText: {
    fontSize: 16,
    fontWeight: "500",
    padding: 10,
    borderRadius: 10,
  },
  carButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#030dad",
    alignItems: "center",
    justifyContent: "center",
  },
  userButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#e80505",
    alignItems: "center",
    justifyContent: "center",
  },
});
