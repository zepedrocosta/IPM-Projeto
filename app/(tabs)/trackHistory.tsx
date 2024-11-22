import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TrackHistory() {
    const params = useLocalSearchParams();

    const [car, setCar] = useState({
        url: params.url.toString(),
        brand: params.brand.toString(),
        model: params.model.toString(),
        year: params.year.toString(),
        plate: params.plate.toString(),
    });

    const [trackRecords, setTrackRecords] = useState<
        { name: string; date: string; maxSpeed: string; totalTime: string }[]
    >([]);
    const router = useRouter();

    const fetchTrackRecords = async () => {
        try {
            const key = `${car.model}-${car.plate}`;
            const records = await AsyncStorage.getItem(key);
            if (records) {
                setTrackRecords(JSON.parse(records)); // Parse and store track records
            } else {
                setTrackRecords([]); // No track records found
            }
        } catch (error) {
            console.error("Error fetching track records:", error);
        }
    };

    const deleteTrackRecord = (index: number) => {
        Alert.alert(
          "Delete Record",
          "Are you sure you want to delete this track record?",
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Delete",
              style: "destructive",
              onPress: async () => {
                try {
                  const key = `${car.model}-${car.plate}`;
                  const updatedRecords = trackRecords.filter((_, i) => i !== index);
                  setTrackRecords(updatedRecords);
                  await AsyncStorage.setItem(key, JSON.stringify(updatedRecords));
                  Alert.alert("Record Deleted", "Your track record has been successfully deleted.");
                } catch (error) {
                  console.error("Error deleting track record:", error);
                  Alert.alert("Error", "Failed to delete your track record.");
                }
              },
            },
          ],
          { cancelable: true } // Dismiss the alert by tapping outside
        );
      };

    useEffect(() => {
        fetchTrackRecords(); // Fetch track records when the component mounts
    }, []);

    const navigateToCarPage = () => {
        router.push({
            pathname: "/car",
            params: {
                url: car.url,
                brand: car.brand,
                model: car.model,
                year: car.year,
                plate: car.plate,
            },
        });
    };

    const navigateToTrackRecords = () => {
        router.push({
            pathname: "/(tabs)/trackRecords",
            params: {
                url: car.url,
                brand: car.brand,
                model: car.model,
                year: car.year,
                plate: car.plate,
            },
        });
    };

    const navigateToTrackRecordDetails = (record: any) => {
        router.push({
            pathname: "/(tabs)/trackRecordDetails",
            params: {
                url: car.url,
                brand: car.brand,
                model: car.model,
                year: car.year,
                plate: car.plate,
                totalTime: record.totalTime,
                totalMilliseconds: record.totalMilliseconds,
                lapTimes: record.lapTimes,
                averageSpeed: record.averageSpeed,
                maxSpeed: record.maxSpeed,
            },
        });
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <SafeAreaView style={styles.topBar}>
                <AntDesign name="left" size={24} style={styles.backButton} onPress={navigateToCarPage} />
                <Text style={styles.topTextBar}>{car.model} ({car.plate})</Text>
            </SafeAreaView>
            <View style={styles.trackRecordList}>
                <Text style={styles.topText}>Previous track records: </Text>
                {trackRecords.length > 0 ? (
                    trackRecords.map((record, index) => (
                        <View key={index} style={styles.recordContainer}>
                            <MaterialIcons name="info" size={24} style={styles.infoIcon}
                                onPress={() => navigateToTrackRecordDetails(record)} />
                            <View style={styles.recordDetails}>
                                <Text style={styles.recordName}>{record.name}</Text>
                                <Text style={styles.recordDate}>{parseFloat(record.maxSpeed).toFixed(1)} Km/h</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => deleteTrackRecord(index)}
                                style={styles.deleteButton}
                            >
                                <AntDesign name="delete" size={24} color="red" />
                            </TouchableOpacity>
                        </View>
                    ))
                ) : (
                    <Text style={styles.noRecordsText}>No track records available.</Text>
                )}
            </View>

            <TouchableOpacity
                style={styles.addButton}
                activeOpacity={0.7}
                onPress={navigateToTrackRecords}
            >
                <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 36 }}>+</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    topBar: {
        display: "flex",
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 15,
    },
    topTextBar: {
        fontSize: 23,
    },
    topText: {
        fontSize: 23,
        borderBottomColor: "lightgray",
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 17,
    },
    backButton: {
        padding: 22,
        color: "#007aff",
    },
    trackRecordList: {
        width: "100%",
        paddingHorizontal: 20,
    },
    recordContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
        borderBottomColor: "lightgray",
        borderBottomWidth: 1,
        paddingVertical: 10,
    },
    infoIcon: {
        marginRight: 10,
        color: "gray",
    },
    recordDetails: {
        flex: 1,
    },
    recordName: {
        fontSize: 18,
        fontWeight: "bold",
    },
    recordDate: {
        fontSize: 16,
        color: "gray",
    },
    deleteButton: {
        marginLeft: 10,
    },
    noRecordsText: {
        fontSize: 18,
        fontStyle: "italic",
        color: "gray",
        textAlign: "center",
    },
    addButton: {
        position: "absolute",
        bottom: 20,
        right: 25,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#3399ff",
        alignItems: "center",
        justifyContent: "center",
    },
});
