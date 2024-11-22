import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal, TextInput } from "react-native";

import { Car } from "@/types/car";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface TrackRecordProps {
  car: Car;
}

export default function TrackRecord({ car }: TrackRecordProps) {
  const [totalTime, setTotalTime] = useState(0);
  const [totalMilliseconds, setTotalMilliseconds] = useState(0);
  const [lapTime, setLapTime] = useState(0);
  const [lapMilliseconds, setLapMilliseconds] = useState(0);
  const [lapTimes, setLapTimes] = useState<number[]>([]);
  const [averageSpeed, setAverageSpeed] = useState(0);
  const [maxSpeed, setMaxSpeed] = useState(0);
  const [isRacing, setIsRacing] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [recordName, setRecordName] = useState("");


  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const speedIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRacing) {
      intervalRef.current = setInterval(() => {
        setTotalMilliseconds((prev) => {
          if (prev >= 999) {
            setTotalTime((prevTime) => prevTime + 1);
            return 0;
          }
          return prev + 100;
        });

        setLapMilliseconds((prev) => {
          if (prev >= 999) {
            setLapTime((prevTime) => prevTime + 1);
            return 0;
          }
          return prev + 100;
        });

        const currentSpeed = Math.random() * 200;

        if (currentSpeed > maxSpeed) {
          setMaxSpeed(currentSpeed);
        }
      }, 100);

      speedIntervalRef.current = setInterval(() => {
        const currentSpeed = Math.random() * 200;
        setAverageSpeed(currentSpeed);
      }, 3000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (speedIntervalRef.current) {
        clearInterval(speedIntervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (speedIntervalRef.current) {
        clearInterval(speedIntervalRef.current);
      }
    };
  }, [isRacing, maxSpeed]);

  const handleNewLap = () => {
    setLapTimes((prev) => [...prev, lapTime]);
    setLapTime(0);
    setLapMilliseconds(0);
  };

  const handleEndTrackRecord = () => {
    setIsRacing(false);
    setModalVisible(true); // Show the modal for input
  };

  const saveRecord = async () => {
    if (!recordName.trim()) {
      Alert.alert("Error", "Record name is required.");
      return;
    }

    const record = {
      name: recordName.trim(),
      totalTime,
      totalMilliseconds,
      lapTimes,
      averageSpeed,
      maxSpeed,
    };

    const key = `${car.model}-${car.plate}`;

    try {
      const existingRecords = await AsyncStorage.getItem(key);
      const records = existingRecords ? JSON.parse(existingRecords) : [];

      records.push(record);

      await AsyncStorage.setItem(key, JSON.stringify(records));
      console.log("Record saved to AsyncStorage:", record);
      Alert.alert("Record Saved", "Your track record has been successfully saved.");
    } catch (error) {
      console.error("Failed to save record to AsyncStorage:", error);
      Alert.alert("Error", "Failed to save your track record.");
    }

    setTotalTime(0);
    setTotalMilliseconds(0);
    setLapTime(0);
    setLapMilliseconds(0);
    setLapTimes([]);
    setAverageSpeed(0);
    setMaxSpeed(0);

    setRecordName("");
    setModalVisible(false);

    // Clear intervals
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (speedIntervalRef.current) {
      clearInterval(speedIntervalRef.current);
    }
  };


  const formatTime = (seconds: number, milliseconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" + secs : secs}.${Math.floor(milliseconds / 100)}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.elapsedTimeText}>Elapsed Time:</Text>
      <Text style={styles.timeText}>{formatTime(totalTime, totalMilliseconds)} s</Text>
      <Text style={styles.timeText}>{formatTime(lapTime, lapMilliseconds)} s</Text>

      <Text style={styles.previousLapsText}>Previous Laps:</Text>
      <ScrollView style={styles.lapList} contentContainerStyle={{ paddingBottom: 10 }}>
        {lapTimes.map((lap, index) => (
          <Text key={index} style={styles.lapItem}>
            Lap {index + 1}: {formatTime(lap, 0)}
          </Text>
        ))}
        {lapTimes.length == 0 &&
          <Text style={styles.lapItem}>No laps yet.</Text>
        }
      </ScrollView>

      <Text style={styles.speedText}>Avg Speed: {averageSpeed.toFixed(1)} Km/h</Text>
      <Text style={styles.speedText}>Max Speed: {maxSpeed.toFixed(1)} Km/h</Text>

      <View style={styles.buttonsContainer}>
        {!isRacing ? (
          <TouchableOpacity style={styles.button} onPress={() => setIsRacing(true)}>
            <Text style={styles.buttonText}>Start Race</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity style={styles.button} onPress={handleNewLap}>
              <Text style={styles.buttonText}>New Lap</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleEndTrackRecord}>
              <Text style={styles.buttonText}>End Track Record</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Record Name</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Record Name"
              value={recordName}
              onChangeText={setRecordName}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={saveRecord}>
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  elapsedTimeText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  timeText: {
    fontSize: 24,
    color: "#333",
    marginBottom: 20,
  },
  previousLapsText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  lapList: {
    maxHeight: 100,
  },
  lapItem: {
    fontSize: 16,
    marginVertical: 5,
  },
  speedText: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#3399ff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: "45%",
    alignItems: "center",
    justifyContent: 'center',
    margin: 10
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
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
    marginBottom: 10,
  },
  modalInput: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    backgroundColor: "#3399ff",
    borderRadius: 5,
    alignItems: "center",
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

});
