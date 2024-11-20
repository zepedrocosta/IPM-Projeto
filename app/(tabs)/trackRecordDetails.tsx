import { AntDesign } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TrackRecordDetails = () => {
    const params = useLocalSearchParams();
    
    const [car, setCar] = useState({
        imageURL: params.url.toString(),
        brand: params.brand.toString(),
        model: params.model.toString(),
        year: params.year.toString(),
        plate: params.plate.toString(),
    });
    
    const [record, setRecord] = useState({
        totalTime: params.totalTime.toString(),
        totalMilliseconds: params.totalMilliseconds.toString(),
        lapTimes: Array.isArray(params.lapTimes) ? params.lapTimes : [],
        averageSpeed: params.averageSpeed.toString(),
        maxSpeed: params.maxSpeed.toString(),
    });

    const formatTime = (seconds: number, milliseconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? "0" + secs : secs}.${Math.floor(milliseconds / 100)}`;
    };
    

    const router = useRouter();
    
    const navigateToCarPage = () => {
        router.push({
            pathname: "/(tabs)/trackHistory",
            params: {
                url: car.imageURL,
                brand: car.brand,
                model: car.model,
                year: car.year,
                plate: car.plate,
            },
        });
    };

    return (
        <ScrollView style={styles.container}>
            <SafeAreaView style={styles.topBar}>
                <AntDesign name="left" size={24} style={styles.backButton} onPress={navigateToCarPage} />
                <Text style={styles.topTextBar}>{car.brand} {car.model} {car.plate}</Text>
            </SafeAreaView>

            <Text style={styles.header}>Track Record Details</Text>

            <Text style={styles.detailText}>Max Speed: {record.maxSpeed} Km/h</Text>
            <Text style={styles.detailText}>Avg Speed: {record.averageSpeed} Km/h</Text>
            <Text style={styles.detailText}>Total Time: {record.totalTime}.{record.totalMilliseconds} s</Text>

            <Text style={styles.subHeader}>Lap Times:</Text>
            {record.lapTimes.length > 0 ? (
                record.lapTimes.map((lap, index) => (
                    <Text key={index} style={styles.lapText}>Lap {index + 1}: {lap}</Text>
                ))
            ) : (
                <Text style={styles.noLapsText}>No lap times available.</Text>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    topBar: {
        display: "flex",
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
        marginTop: -15
    },
    backButton: {
        padding: 22,
    },
    topTextBar: {
        fontSize: 23,
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    subHeader: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 20,
    },
    detailText: {
        fontSize: 16,
        marginBottom: 10,
    },
    lapText: {
        fontSize: 16,
        marginLeft: 10,
        marginBottom: 5,
    },
    noLapsText: {
        fontSize: 16,
        color: "gray",
    },
});

export default TrackRecordDetails;
