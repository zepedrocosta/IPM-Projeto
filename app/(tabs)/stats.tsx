import { AntDesign } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Stats = () => {
  const params = useLocalSearchParams();

  const [car, setCar] = useState({
    imageURL: params.url.toString(),
    brand: params.brand.toString(),
    model: params.model.toString(),
    year: params.year.toString(),
    plate: params.plate.toString(),
  });

  const router = useRouter();

  const navigateToCarPage = () => {
    router.back();
  };

  const handleImportStats = () => {
    Alert.alert("Imported", "Car statistics were successfully imported.");
  };

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView style={styles.topBar}>
        <AntDesign
          name="left"
          size={24}
          style={styles.backButton}
          onPress={navigateToCarPage}
        />
        <Text style={styles.topTextBar}>
          {car.brand} {car.model} {car.plate}
        </Text>
      </SafeAreaView>

      <Text style={styles.header}>Performance Details</Text>

      <Text style={styles.detailText}>Highest Speed: 201 Km/h</Text>
      <Text style={styles.detailText}>Average Speed: 112.6 Km/h</Text>
      <Text style={styles.detailText}>
        Time on the track: 3950 s (65 minutes)
      </Text>

      <Text style={styles.subHeader}>Best Lap Times:</Text>
      <Text style={styles.lapText}>Race 1: 7s (Lap 5)</Text>
      <Text style={styles.lapText}>Race 5: 8s (Lap 2)</Text>
      <Text style={styles.lapText}>Race 5 : 8.66s (Lap 6)</Text>

      <Text style={styles.subHeader}>Speed graph</Text>

      <View style={styles.containerGraphs}>
        <View style={styles.containerGraph}>
          <Text style={styles.noLapsText}>Speed over time</Text>
          <View style={styles.containerImage}>
            <View style={styles.textContainer}>
              <Text style={styles.verticalText}>Speed</Text>
            </View>
            <Image
              source={require("../../assets/images/graph.png")}
              style={styles.image}
            />
          </View>
          <Text style={styles.noLapsTextBelow}>Time</Text>
        </View>

        <View style={styles.containerGraph}>
          <Text style={styles.noLapsText}>Speed over laps</Text>
          <View style={styles.containerImage}>
            <View style={styles.textContainer}>
              <Text style={styles.verticalText}>Speed</Text>
            </View>
            <Image
              source={require("../../assets/images/graph.png")}
              style={styles.image}
            />
          </View>
          <Text style={styles.noLapsTextBelow}>Race Lap</Text>
        </View>

        <View style={styles.containerGraph}>
          <Text style={styles.noLapsText}>Time over laps</Text>
          <View style={styles.containerImage}>
            <View style={styles.textContainer}>
              <Text style={styles.verticalText}>Time</Text>
            </View>
            <Image
              source={require("../../assets/images/graph.png")}
              style={styles.image}
            />
          </View>
          <Text style={styles.noLapsTextBelow}>Lap</Text>
        </View>

        <View style={styles.containerGraph}>
          <Text style={styles.noLapsText}>Tire wear</Text>
          <View style={styles.containerImage}>
            <View style={styles.textContainer}>
              <Text style={styles.verticalText}>Tire wear</Text>
            </View>
            <Image
              source={require("../../assets/images/graph.png")}
              style={styles.image}
            />
          </View>
          <Text style={styles.noLapsTextBelow}>Time</Text>
        </View>
      </View>

      <View style={styles.containerImport}>
        <TouchableOpacity style={styles.button} onPress={handleImportStats}>
          <Text style={styles.buttonText}>Import Stats</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  topBar: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    marginTop: -20,
    marginLeft: -20,
  },
  backButton: {
    padding: 22,
    color: "#007aff",
  },
  topTextBar: {
    fontSize: 23,
    fontWeight: "600",
    color: "#333",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#222",
  },
  subHeader: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 15,
    color: "#444",
  },
  detailText: {
    fontSize: 16,
    marginBottom: 10,
    color: "#555",
  },
  lapText: {
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 5,
    color: "#666",
  },
  noLapsText: {
    fontSize: 16,
    color: "#666",
  },
  noLapsTextBelow: {
    fontSize: 16,
    color: "#666",
    marginTop: -10,
  },
  containerImage: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: -10,
  },
  verticalText: {
    fontSize: 16,
    writingDirection: "ltr",
    transform: [{ rotate: "90deg" }],
    marginBottom: 20,
    color: "#888",
  },
  image: {
    width: 120,
    height: 157,
    borderRadius: 10,
  },
  containerGraph: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
  },
  containerGraphs: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
        justifyContent: 'center',
        marginTop: 10
  },
  containerImport: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#3399ff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: "45%",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Stats;
