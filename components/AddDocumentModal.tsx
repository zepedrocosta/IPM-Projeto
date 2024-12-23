import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePickerModal from "react-native-modal-datetime-picker"; // Native DatePicker
import * as DocumentPicker from "expo-document-picker";
import ReminderModal from "./ReminderModal";
import * as FileSystem from "expo-file-system";
import { httpPost } from "@/utils/http";
import { Car } from "@/types/car";

interface AddDocumentModalProps {
  car: Car;
  visible: boolean;
  onClose: () => void;
  onConfirm: (document: {
    file: any;
    category: string;
    date: Date | null;
  }) => void; // Accept a document argument
  //onAddDocument: (document: any) => void; // Update the type based on your needs
}

export default function AddDocumentModal({
  car,
  visible,
  onClose,
  onConfirm,
}: AddDocumentModalProps) {
  const [file, setFile] = useState<any | null>(null); // File object
  const [file64, setFile64] = useState<string>("");
  const [category, setCategory] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState<Date | null>(null); // Union type, hold a null value but still have the type Date defined
  const [showReminderModal, setShowReminderModal] = useState(false);

  // Documents that expire every year
  // Stuff like inspection, insurace
  // REMINDERS ARE ONLY APPLICABLE TO THESE DOCUMENTS
  const expirableDocuments = ["Insurance", "Inspection", "Expirable"];

  // DatePicker Related functions
  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleDateConfirm = (selectedDate: Date) => {
    setDate(selectedDate);
    hideDatePicker();
  };

  // Function to handle file selection
  const handleFileUpload = async () => {
    try {
      const result: DocumentPicker.DocumentPickerResult =
        await DocumentPicker.getDocumentAsync({ type: "application/pdf" });
      console.log("document picker result: ", result);

      if (
        result.canceled === false &&
        result.assets?.[0]?.name.includes(".pdf")
      ) {
        // Add feedback, if the file selected is not supported, tell the user
        const fileUri = result.assets[0].uri;
        const base64 = await FileSystem.readAsStringAsync(fileUri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        setFile(result.assets[0]);
        setFile64(base64);
      } else {
        console.log("invalid file selected");
      }
    } catch (err) {
      console.error("Error picking document:", err);
    }
  };

  const handleReminderSet = (daysBefore: number) => {
    console.log(`Reminder set for ${daysBefore} days before expiration.`);
    setShowReminderModal(false);
    onClose(); // Close AddDocumentModal
  };

  const handleReminderCancel = () => {
    console.log("No reminder set.");
    setShowReminderModal(false);
    onClose(); // Close AddDocumentModal
  };

  const handleAddDocument = () => {
    if (category === "" || file === null) {
      ToastAndroid.show(
        "Please select a category and a file.",
        ToastAndroid.SHORT
      );
      return;
    }

    setCategoryName(category);
    console.log(category);
    const newDocument = {
      type: category.toUpperCase(),
      content: file64,
      dueDate: expirableDocuments.includes(category)
        ? date?.toISOString().split(".")[0]
        : null,
      car: car
    };

    httpPost(`/cars/${car.plate}/documents`, newDocument).then(
      (response: any) => {
        console.log("Document added: ", response.data);
        onConfirm({
          file: file,
          category: category,
          date: date,
        });
        onClose();
        setFile(null);
        setDate(null);
        setCategory("");
        setShowReminderModal(true);
      },
      (error) => {
        console.log("Error adding document: ", error);
      }
    );
  };

  return (
    <>
      <Modal visible={visible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Document</Text>

            {/* Category Selection Section */}
            <View style={styles.section}>
              <Text style={styles.label}>Category</Text>
              <Picker
                selectedValue={category}
                onValueChange={(itemValue) => setCategory(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Select Category" value="" enabled={false} />
                <Picker.Item label="Insurance" value="Insurance" />
                <Picker.Item label="Registration" value="Registration" />
                <Picker.Item label="Inspection" value="Inspection" />
                <Picker.Item label="Expirable" value="Expirable" />
              </Picker>
            </View>

            {/* File Upload Section */}
            <View style={styles.section}>
              <Text style={styles.label}>File</Text>
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={handleFileUpload}
              >
                <Text style={styles.uploadButtonText}>
                  {file ? `Selected: ${file.name}` : "Upload File"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Date Picker Section */}
            {expirableDocuments.includes(category) && (
              <View style={styles.section}>
                <Text style={styles.label}>Expiration Date</Text>
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
                    minimumDate={new Date()}
                  />
                </View>
              </View>
            )}

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
              <Button title="Cancel" onPress={onClose} color="red" />
              <Button
                title="Confirm"
                onPress={handleAddDocument}
                color="green"
              />
            </View>
          </View>
        </View>
      </Modal>
      {/* Reminder Modal */}
      <ReminderModal
        visible={showReminderModal}
        onClose={handleReminderCancel} // When user cancels reminder
        onSetReminder={handleReminderSet} // When user sets a reminder
        category={categoryName}
        car = {car}
      />
    </>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "flex-start",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
    width: "100%",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  uploadButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  uploadButtonText: {
    color: "white",
    textAlign: "center",
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    width: "100%",
  },
  datePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dateLabel: {
    fontSize: 16,
    flex: 1,
  },
  datePickerButton: {
    backgroundColor: "#007bff",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  datePickerButtonText: {
    color: "white",
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
