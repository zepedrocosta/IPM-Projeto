import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  Button,
  StyleSheet,
} from 'react-native';
import { Picker } from "@react-native-picker/picker";
import { scheduleOneMinuteReminder } from '@/utils/notifications';
import Car from '@/app/car';

interface ReminderModalProps {
  visible: boolean;
  onClose: () => void;
  onSetReminder: (daysBefore: number) => void; // Pass back the reminder interval
  category: string;
  car: Car;
}

export default function ReminderModal({ visible, onClose, onSetReminder, category, car }: ReminderModalProps) {
  const [stage, setStage] = useState(1); // Track the current stage
  const [daysBefore, setDaysBefore] = useState(1); // Default reminder interval


  useEffect(() => {
    if (visible) {
      setStage(1); // Reset to stage 1 every time the modal is opened
    }
  }, [visible]);

  const handleYes = () => {
    setStage(2); // Move to the next stage
  };

  const handleSetReminder = () => {
    onSetReminder(daysBefore); // Pass the selected interval to the parent
    scheduleOneMinuteReminder(category, car);
    onClose(); // Close the modal
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {stage === 1 && (
            <>
              <Text style={styles.title}>Set Reminder</Text>
              <Text>Would you like to set a reminder for this document?</Text>
              <View style={styles.buttonRow}>
                <Button title="No" onPress={onClose} color="red" />
                <Button title="Yes" onPress={handleYes} color="green" />
              </View>
            </>
          )}
          {stage === 2 && (
            <>
              <Text style={styles.title}>Reminder Interval</Text>
              <Text>How many days before the expiration date should we remind you?</Text>
              <Picker
                selectedValue={daysBefore}
                onValueChange={(itemValue) => setDaysBefore(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="1 Day" value={1} />
                <Picker.Item label="3 Days" value={3} />
                <Picker.Item label="7 Days" value={7} />
                <Picker.Item label="14 Days" value={14} />
              </Picker>
              <View style={styles.buttonRow}>
                <Button title="Cancel" onPress={onClose} color="red" />
                <Button title="Confirm" onPress={handleSetReminder} color="green" />
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },
  picker: {
    width: '100%',
    marginVertical: 20,
  },
});
