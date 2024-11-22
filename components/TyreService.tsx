import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import styles from "./styles";
import Car from "@/app/car";

export default function TyreServicePage({ car }: { car: Car }) {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <Text style={styles.CarName}>{car.brand}</Text>
      <Text style={styles.CarName}>{car.model}</Text>
      <Text style={styles.licencePlate}>({car.plate})</Text>

      {/* Car layout */}
      <Text style={styles.PageTitle}>Tyre Status</Text>
      <View style={styles.tyreStatus}>
      <View style={styles.row}>
        {/* Left Tyre Info */}
        <View style={styles.verticalTyreInfo}>
          <View>
            <Text style={styles.tyrePressureText}>2.3 bar</Text>
            <Text style={styles.tyreText}>Tyre Wear: OK</Text>
          </View>
          <View>
            <Text style={styles.tyrePressureText}>2.3 bar</Text>
            <Text style={styles.tyreText}>Tyre Wear: OK</Text>
          </View>
        </View>

        {/* Car Image */}
        <View>
          <Image
            source={require("../assets/images/bellow-car-view.png")}
            style={styles.carImage}
          />
        </View>

        {/* Right Tyre Info */}
        <View style={styles.verticalTyreInfo}>
          <View>
            <Text style={styles.tyrePressureText}>2.3 bar</Text>
            <Text style={styles.tyreText}>Tyre Wear: OK</Text>
          </View>
          <View>
            <Text style={styles.tyrePressureText}>2.3 bar</Text>
            <Text style={styles.tyreText}>Tyre Wear: OK</Text>
          </View>
        </View>
      </View>
      </View>
      {/* Tyre Details */}
      <View style={styles.itemsBox}>
        <Text style={styles.PageTitle}>Tyre Details</Text>

        <View style={styles.itemBox}>
          <Text style={styles.itemTitle}>Brand</Text>
          <Text style={styles.itemDate}>Pirelli</Text>
        </View>
        <View style={styles.itemBox}>
          <Text style={styles.itemTitle}>Model</Text>
          <Text style={styles.itemDate}>P-Zero 245/45 R18</Text>
        </View>
        <View style={styles.itemBox}>
          <Text style={styles.itemTitle}>Next Tyre Change</Text>
          <Text style={styles.itemDate}>100.000 kms</Text>
        </View>
      </View>
    </ScrollView>
  );
}
