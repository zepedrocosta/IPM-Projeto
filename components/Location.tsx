import Car from "@/app/car";
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
    latitude: 37.7749,
    longitude: -122.4194,
  });

  const [carLocation] = useState([
    {
      id: "1",
      latitude: 38.7169,
      longitude: -9.1395,
      street: "Address: Avenida da Liberdade, Lisbon, Portugal",
    },
    {
      id: "2",
      latitude: 23.1136,
      longitude: -82.3666,
      street: "Address: Parque Central, Havana, Cuba",
    },
    {
      id: "3",
      latitude: 51.5074,
      longitude: -0.1278,
      street: "Address: Trafalgar Square, London, UK",
    },
    {
      id: "4",
      latitude: 48.8566,
      longitude: 2.3522,
      street: "Address: Champs-Élysées, Paris, France",
    },
    {
      id: "5",
      latitude: 40.7128,
      longitude: -74.006,
      street: "Address: Times Square, New York, USA",
    },
    {
      id: "6",
      latitude: 34.0522,
      longitude: -118.2437,
      street: "Address: Hollywood Blvd, Los Angeles, USA",
    },
    {
      id: "7",
      latitude: -33.8688,
      longitude: 151.2093,
      street: "Address: Sydney Opera House, Sydney, Australia",
    },
    {
      id: "8",
      latitude: 39.9042,
      longitude: 116.4074,
      street: "Address: Tiananmen Square, Beijing, China",
    },
    {
      id: "9",
      latitude: 40.7306,
      longitude: -73.9352,
      street: "Address: Brooklyn Bridge, New York, USA",
    },
    {
      id: "10",
      latitude: 48.2082,
      longitude: 16.3738,
      street: "Address: Stephansplatz, Vienna, Austria",
    },
    {
      id: "11",
      latitude: 34.0522,
      longitude: -118.2437,
      street: "Address: Griffith Park, Los Angeles, USA",
    },
    {
      id: "12",
      latitude: 40.748817,
      longitude: -73.985428,
      street: "Address: Empire State Building, New York, USA",
    },
    {
      id: "13",
      latitude: -22.9068,
      longitude: -43.1729,
      street: "Address: Copacabana Beach, Rio de Janeiro, Brazil",
    },
  ]);

  function getLocationIndex(input: any) {
    const hash = [...input].reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return hash % carLocation.length;
  }

  function getLocationFromString(input: any) {
    const index = getLocationIndex(input);
    return carLocation[index];
  }

  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );

  const handleSelectLocation = (input: any) => {
    const location = getLocationFromString(input);
    setSelectedLocation(location);
  };

  useEffect(() => {
    handleSelectLocation(car.brand);
  }, []);

  return (
    <View style={styles.container}>
      {/*<MapView
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
                        coordinate={{
                            latitude: selectedLocation.latitude,
                            longitude: selectedLocation.longitude,
                        }}
                        title="Car Location"
                        description={selectedLocation.street}
                    />
                )}
            </MapView>*/}
      <View style={styles.locationMapContainer}>
        <Image
          style={styles.locationMap}
          source={require("../assets/images/locations/location1.png")}
        ></Image>
      </View>

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
  },
  map: {
    flex: 1,
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
