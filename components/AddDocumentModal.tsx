import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import DocumentPicker from 'react-native-document-picker';

// MISSING:
// DATE TIME PICKER NATIVE (CANNOT TEST CURRENT DATETIMEPICKER ON WEB)
// THE 2 MODALS FOR THE ADD REMINDER STAGE OF ADDING A DOCUMENT

interface AddDocumentModalProps {
  visible: boolean;
  onClose: () => void;
  //onAddDocument: (document: any) => void; // Update the type based on your needs
}

export default function AddDocumentModal({ visible, onClose }: AddDocumentModalProps) {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());

  // Documents that expire every year
  // Stuff like inspection, insurace
  // REMINDERS ARE ONLY APPLICABLE TO THESE DOCUMENTS
  const expirableDocuments = ["Insurance", "Inspection", "Expirable"];

  // Function to handle file selection
  const handleFileUpload = async () => {
    /*const result = await DocumentPicker.getDocumentAsync({});
    if (result.type === 'success') {
      setFile(result);
    }*/
   console.log("pick a file...");
  };

  const handleAddDocument = () => {
    const newDocument = {
      file,
      category,
      date: category === 'Expirable' ? date : null, // might have to review this
    };
    //onAddDocument(newDocument);
    onClose();
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add Document</Text>

          {/* File uploader */}
          <TouchableOpacity style={styles.uploadButton} onPress={handleFileUpload}>
            <Text style={styles.uploadButtonText}>{file ? 'File Selected' : 'Upload File'}</Text>
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
            <Picker.Item label="Expirable" value="Expirable" /> {/* Choose categories as needed */}
          </Picker>

          {/* Conditional date picker */}
          {expirableDocuments.includes(category.toString()) && (
            <>
              <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  uploadButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  uploadButtonText: {
    color: 'white',
  },
  picker: {
    width: '100%',
    marginBottom: 10,
  },
  datePickerButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  datePickerText: {
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
});
