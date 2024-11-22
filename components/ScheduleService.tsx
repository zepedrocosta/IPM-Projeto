import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePickerModal from "react-native-modal-datetime-picker"; // Native DatePicker

import Car from "@/app/car";

import styles from "./styles";
import { httpPost } from "@/utils/http";
import { router } from "expo-router";

export default function ScheduleServicePage({ car }: { car: Car }) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState<Date>();
  const [category, setCategory] = useState<string>("");
  const [serviceCenter, setServiceCenter] = useState<string>("");
  const [lifetime, setLifetime] = useState("");

  const handleSubmit = () => {
    httpPost("/cars/" + car.plate + "/services", {
      dueDate: date,
      dueKms: parseInt(lifetime),
      type: category,
      place: serviceCenter,
    }).then(
      (response: any) => {
        router.back();
      },
      (error) => {
        console.log(error);
      }
    );
  };

  // DatePicker (Date) Related functions
  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleDateConfirm = (selectedDate: Date) => {
    console.log("A date has been picked: ", selectedDate);
    setDate(selectedDate);
    hideDatePicker();
  };

  return (
    <KeyboardAvoidingView>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <Text style={styles.CarName}>{car.brand}</Text>
        <Text style={styles.CarName}>{car.model}</Text>
        <Text style={styles.licencePlate}>({car.plate})</Text>

        <View style={styles.itemsBox}>
          <View style={styles.itemBox}>
            <Text style={styles.itemTitle}>Service Type</Text>
            <Picker
              selectedValue={category}
              onValueChange={(itemValue) => setCategory(itemValue)}
              style={styles.inputBox}
            >
              <Picker.Item label="Select Category" value="" />
              <Picker.Item label="Oil Change" value="OIL_CHANGE" />
              <Picker.Item label="Brake Change" value="BRAKE_CHANGE" />
              <Picker.Item label="Inspection" value="INSPECTION" />
              <Picker.Item label="Vehicle Check" value="VEHICLE_CHECKUP" />
            </Picker>
          </View>

          <View style={styles.itemBox}>
            <Text style={styles.itemTitle}>Date</Text>
            <View style={styles.datePickerContainer}>
              <Text style={styles.dateLabel}>
                {date ? `${date}` : "No date selected"}
              </Text>
              <TouchableOpacity
                style={styles.datePickerButton}
                onPress={showDatePicker}
              >
                <Text style={styles.datePickerButtonText}>Pick Date</Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                onConfirm={handleDateConfirm}
                onCancel={hideDatePicker}
              />
            </View>
          </View>

          <View style={styles.itemBox}>
            <Text style={styles.itemTitle}>Lifetime (kms)</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="Enter the lifetime in kms"
              value={lifetime}
              onChangeText={setLifetime}
            />
          </View>

          <View style={styles.itemBox}>
            <Text style={styles.itemTitle}>Service Center</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="Enter the service center name"
              value={serviceCenter}
              onChangeText={setServiceCenter}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
