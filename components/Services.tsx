import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  TouchableOpacity,
} from "react-native";

export default function ServicesPage() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Ford Mustang</Text>
      <Text style={styles.licencePlate}>(XX-09-XX)</Text>

      <View style={styles.serviceBox}>
        <Text style={styles.serviceTitle}>Next Service</Text>

        <View style={styles.itemBox}>
          <Text style={styles.itemTitle}>Engine Oil</Text>
          <Text style={styles.itemDate}>September 2026</Text>
          <Text style={styles.itemKm}>100,000 kms</Text>
        </View>

        <View style={styles.itemBox}>
          <Text style={styles.itemTitle}>Brake Fluid</Text>
          <Text style={styles.itemDate}>September 2026</Text>
          <Text style={styles.itemKm}>100,000 kms</Text>
        </View>

        <View style={styles.itemBox}>
          <Text style={styles.itemTitle}>Inspection (IPO)</Text>
          <Text style={styles.itemDate}>September 2026</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Schedule Inspection</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.itemBox}>
          <Text style={styles.itemTitle}>Vehicle Check</Text>
          <Text style={styles.itemDate}>September 2026</Text>
          <Text style={styles.itemKm}>100,000 kms</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Tyre Service</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  licencePlate: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
    textAlign: "center",
  },
  serviceBox: {
    width: "100%",
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    minWidth: 400,
  },
  serviceTitle: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  itemBox: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingHorizontal: 10,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemDate: {
    fontSize: 16,
    color: "gray",
    alignSelf: "flex-end",
  },
  itemKm: {
    fontSize: 16,
    color: "gray",
    textAlign: "right",
  },
  button: {
    backgroundColor: "#007BFF",
    height: 35,
    width: 250,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: "center",
    justifyContent: 'center'
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    textAlign: "center",
  },
});
