import { Car } from "@/types/car";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

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
  const [userLocation] = useState({
    latitude: 38.660667,
    longitude: -9.203528,
  });

  const [selectedLocation] = useState<Location>({
    id: "1",
    latitude: 38.659083,
    longitude: -9.204222,
    street: "2825-097 Caparica",
  });

  return (
    <View style={styles.container}>
      {
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
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
      }

      <View style={styles.addressBox}>
        <Text style={styles.addressText}>
          {selectedLocation?.street || "Location not available"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "80%",
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
});