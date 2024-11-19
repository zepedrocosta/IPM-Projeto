import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Car from "@/app/car";

import styles from "./styles";

export default function ScheduleInspectionPage({ car }: { car: Car }) {
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [inspectionCenter, setInspectionCenter] = useState("");

  const handleSubmit = () => {
    console.log({ date, hour, inspectionCenter });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.CarName}>{car.brand}</Text>
      <Text style={styles.CarName}>{car.model}</Text>
      <Text style={styles.licencePlate}>({car.plate})</Text>

      <View style={styles.serviceBox}>
        <View style={styles.itemBox}>
          <Text style={styles.itemTitle}>Date</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="DD-MM-YYYY"
            value={date}
            onChangeText={setDate}
          />
        </View>

        <View style={styles.itemBox}>
          <Text style={styles.itemTitle}>Hour</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="HH:MM"
            value={hour}
            onChangeText={setHour}
          />
        </View>

        <View style={styles.itemBox}>
          <Text style={styles.itemTitle}>Inspection center</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="Enter center name"
            value={inspectionCenter}
            onChangeText={setInspectionCenter}
          />
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
