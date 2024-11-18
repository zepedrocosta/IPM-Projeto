import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker"; // Native DatePicker
import * as DocumentPicker from "expo-document-picker";

interface AddDocumentModalProps {
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
  visible,
  onClose,
  onConfirm,
}: AddDocumentModalProps) {
  const [file, setFile] = useState<any | null>(null); // File object
  const [category, setCategory] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());

  // Documents that expire every year
  // Stuff like inspection, insurace
  // REMINDERS ARE ONLY APPLICABLE TO THESE DOCUMENTS
  const expirableDocuments = ["Insurance", "Inspection", "Expirable"];

  // Function to handle file selection
  const handleFileUpload = async () => {
    try {
      const result: DocumentPicker.DocumentPickerResult =
        await DocumentPicker.getDocumentAsync({
          type: "application/pdf",
        });

      console.log("document picker result: ", result);

      if (
        result.canceled === false &&
        result.assets[0].file?.name.includes(".pdf")
      ) {
        // Add feedback, if the file selected is not supported, tell the user
        console.log("accepted");
        setFile(result);
      }
    } catch (err) {
      console.error("Error picking document:", err);
    }
  };

  const handleAddDocument = () => {
    const newDocument = {
      file,
      category,
      date: expirableDocuments.includes(category) ? date : null, //if document is not of type expirable, no date is passed
    };
    console.log("handleAddDocument: ", newDocument.date);
    onConfirm(newDocument); // Pass the document data to parent
    onClose();
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add Document</Text>

          {/* File uploader */}
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={handleFileUpload}
          >
            <Text style={styles.uploadButtonText}>
              {file ? `Selected: ${file.assets[0].file.name}` : "Upload File"}
            </Text>
          </TouchableOpacity>

          {/* Category picker */}
          <Picker
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Category" value="" />
            <Picker.Item label="Insurance" value="Insurance" />
            <Picker.Item label="Registration" value="Registration" />
            <Picker.Item label="Inspection" value="Inspection" />
            <Picker.Item label="Expirable" value="Expirable" />{" "}
            {/* Choose categories as needed */}
          </Picker>

          {/* Conditional date picker 
          {expirableDocuments.includes(category.toString()) && (
            <>
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={styles.datePickerButton}
              >
                <Text style={styles.datePickerText}>Select Date</Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    const currentDate = selectedDate || date;
                    setShowDatePicker(false);
                    setDate(currentDate);
                  }}
                />
              )}
            </>
          )} */}

          {/* Conditional date picker */}
          {/* Have to make another date function for web testing, because when we confirm the date, is uses DatePicker instead of DateTimePicker*/}
          {expirableDocuments.includes(category) && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                const currentDate = selectedDate || date;
                setShowDatePicker(false);
                setDate(currentDate);
              }}
            />
          )}

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <Button title="Cancel" onPress={onClose} color="red" />
            <Button title="Confirm" onPress={handleAddDocument} color="green" />
          </View>
        </View>
      </View>
    </Modal>
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
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  uploadButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  uploadButtonText: {
    color: "white",
  },
  picker: {
    width: "100%",
    marginBottom: 10,
  },
  datePickerButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  datePickerText: {
    color: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
});
