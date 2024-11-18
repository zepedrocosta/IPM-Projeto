import React, { useState } from 'react';
import { View, Text, Button, Modal, StyleSheet, TextInput } from 'react-native';

interface SetReminderModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (days?: number) => void; // Pass days if applicable, undefined otherwise
}

export default function SetReminderModal({ visible, onClose, onConfirm }: SetReminderModalProps) {
  const [step, setStep] = useState(1); // Step 1: Ask question, Step 2: Select days
  const [days, setDays] = useState(''); // Track user input for reminder days

  function handleNextStep(){
    setStep(2);
  };

  function handleConfirm(){
    const daysInt = parseInt(days, 10);
    if (!isNaN(daysInt) && daysInt > 0) {
      onConfirm(daysInt); // Send days back to parent
      setStep(1); // Reset for next usage
      onClose();
    } else {
      alert('Please enter a valid number of days.');
    }
  };

  function handleSkipReminder(){
    onConfirm(); // No days specified
    setStep(1); // Reset for next usage
    onClose();
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {step === 1 ? (
            <>
              <Text style={styles.modalTitle}>Set Reminder</Text>
              <Text>Would you like to add a reminder?</Text>
              <View style={styles.buttonContainer}>
                <Button title="No" onPress={() => handleSkipReminder()} color="red" />
                <Button title="Yes" onPress={() => handleNextStep()} color="green" />
              </View>
            </>
          ) : (
            <>
              <Text style={styles.modalTitle}>Reminder Settings</Text>
              <Text>How many days before the expiration should we remind you?</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter number of days"
                keyboardType="numeric"
                value={days}
                onChangeText={setDays}
              />
              <View style={styles.buttonContainer}>
                <Button title="Cancel" onPress={onClose} color="red" />
                <Button title="Confirm" onPress={handleConfirm} color="green" />
              </View>
            </>
          )}
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
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    width: '100%',
    marginBottom: 15,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
});
