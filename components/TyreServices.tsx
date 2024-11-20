import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function TyreServicePage() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>← Ford Mustang... (XX-07-XX)</Text>
      </View>

      {/* Title */}
      <Text style={styles.title}>Tyre Service</Text>

      {/* Car layout */}
      <View style={styles.carLayout}>
        <View style={styles.tyreInfo}>
          <Text style={styles.tyreText}>2.3 bar</Text>
          <Text style={styles.tyreText}>Tyre Wear: OK</Text>
        </View>
        <View style={styles.carImage}>
          <View style={styles.carShape}></View>
        </View>
        <View style={styles.tyreInfo}>
          <Text style={styles.tyreText}>2.3 bar</Text>
          <Text style={styles.tyreText}>Tyre Wear: OK</Text>
        </View>
      </View>
      <View style={styles.bottomTyreInfo}>
        <View style={styles.tyreInfo}>
          <Text style={styles.tyreText}>2.3 bar</Text>
          <Text style={styles.tyreText}>Tyre Wear: OK</Text>
        </View>
        <View style={styles.tyreInfo}>
          <Text style={styles.tyreText}>2.3 bar</Text>
          <Text style={styles.tyreText}>Tyre Wear: OK</Text>
        </View>
      </View>

      {/* Tyre Details */}
      <View style={styles.detailsSection}>
        <Text style={styles.detailsText}>Tyre details</Text>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Brand:</Text>
          <Text style={styles.value}>Pirelli</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Model:</Text>
          <Text style={styles.value}>P-Zero...</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Last Tyre change:</Text>
          <Text style={styles.value}>100,000 kms</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  carLayout: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  bottomTyreInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  carImage: {
    flex: 1,
    alignItems: "center",
  },
  carShape: {
    width: 80,
    height: 160,
    backgroundColor: "#ccc",
    borderRadius: 10,
  },
  tyreInfo: {
    alignItems: "center",
    flex: 1,
  },
  tyreText: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  detailsSection: {
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 20,
  },
  detailsText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
  value: {
    fontSize: 16,
  },
});
