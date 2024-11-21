import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

import DateTimePickerModal from "react-native-modal-datetime-picker"; // Native DatePicker

import Car from "@/app/car";

import styles from "./styles";

export default function ScheduleInspectionPage({ car }: { car: Car }) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState<Date | null>(null);

  const [isHourPickerVisible, setHourPickerVisibility] = useState(false);
  const [hour, setHour] = useState<string | null>(null);

  const [inspectionCenter, setInspectionCenter] = useState("");

  const handleSubmit = () => {
    console.log({ date, hour, inspectionCenter });
  };

  // DatePicker (Date) Related functions
  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleDateConfirm = (selectedDate: Date) => {
    setDate(selectedDate);
    hideDatePicker();
  };

  // DatePicker (Hour) Related functions
  const showHourPicker = () => setHourPickerVisibility(true);
  const hideHourPicker = () => setHourPickerVisibility(false);

  const handleHourConfirm = (selectedHour: Date) => {
    const hours = selectedHour.getHours();
    const minutes = selectedHour.getMinutes();
    const formattedHour = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
    setHour(formattedHour);
    hideHourPicker();
  };

  return (
    <KeyboardAvoidingView>
      <ScrollView style={styles.container}>
        <Text style={styles.CarName}>{car.brand}</Text>
        <Text style={styles.CarName}>{car.model}</Text>
        <Text style={styles.licencePlate}>({car.plate})</Text>

        <View style={styles.itemsBox}>
          <View style={styles.itemBox}>
            <Text style={styles.itemTitle}>Date</Text>
            <View style={styles.datePickerContainer}>
              <Text style={styles.dateLabel}>
                {date ? `${date.toDateString()}` : "No date selected"}
              </Text>
              <TouchableOpacity
                style={styles.datePickerButton}
                onPress={showDatePicker}
              >
                <Text style={styles.datePickerButtonText}>Pick Date</Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleDateConfirm}
                onCancel={hideDatePicker}
              />
            </View>
          </View>

          <View style={styles.itemBox}>
            <Text style={styles.itemTitle}>Hour</Text>
            <View style={styles.datePickerContainer}>
              <Text style={styles.dateLabel}>
                {hour ? `${hour}` : "No hour selected"}
              </Text>
              <TouchableOpacity
                style={styles.datePickerButton}
                onPress={showHourPicker}
              >
                <Text style={styles.datePickerButtonText}>Pick Hour</Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isHourPickerVisible}
                mode="time"
                onConfirm={handleHourConfirm}
                onCancel={hideHourPicker}
              />
            </View>
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
