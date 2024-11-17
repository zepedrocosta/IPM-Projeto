import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

import styles from "./styles";

const navigateToScheduleInspection = () => {
  router.push("/scheduleinspection");
};

export default function ServicesPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.CarName}>Ford Mustang</Text>
      <Text style={styles.licencePlate}>(XX-09-XX)</Text>

      <View style={styles.serviceBox}>
        <Text style={styles.PageTitle}>Next Service</Text>

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
            <Text
              style={styles.buttonText}
              onPress={navigateToScheduleInspection}
            >
              Schedule Inspection
            </Text>
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
    </View>
  );
}
