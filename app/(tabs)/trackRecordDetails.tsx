import { AntDesign } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from "react-native";
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

    const handleImportRecord = () => {
        Alert.alert("Imported", "Record was successfully imported.");
    };

    return (
        <ScrollView style={styles.container}>
            <SafeAreaView style={styles.topBar}>
                <AntDesign name="left" size={24} style={styles.backButton} onPress={navigateToCarPage} />
                <Text style={styles.topTextBar}>{car.model} ({car.plate})</Text>
            </SafeAreaView>

            <Text style={styles.header}>Track Record Details</Text>

            <Text style={styles.detailText}>Max Speed: {parseFloat(record.maxSpeed).toFixed(1)} Km/h</Text>
            <Text style={styles.detailText}>Avg Speed: {parseFloat(record.averageSpeed).toFixed(1)} Km/h</Text>
            <Text style={styles.detailText}>Total Time: {record.totalTime}.{record.totalMilliseconds} s</Text>

            <Text style={styles.subHeader}>Lap Times:</Text>
            <Text style={styles.lapText}>Lap 1: 7s</Text>
            <Text style={styles.lapText}>Lap 2: 11s</Text>
            <Text style={styles.lapText}>Lap 3: 6s</Text>

            <Text style={styles.subHeader}>Speed graph</Text>
            <View style={styles.containerGraph}>
                <View style={styles.containerImage}>
                    <View style={styles.textContainer}>
                        <Text style={styles.verticalText}>Speed</Text>
                    </View>
                    <Image
                        source={require("../../assets/images/graph.png")}
                        style={styles.image}
                    />
                </View>
                <Text style={styles.noLapsText}>Time</Text>
            </View>

            <View style={styles.containerImport}>
                <TouchableOpacity style={styles.button} onPress={handleImportRecord}>
                    <Text style={styles.buttonText}>Import</Text>
                </TouchableOpacity>
            </View>
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
        color: "#007aff",
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
    containerImage: {
        flexDirection: 'row', // Arrange image and text horizontally
        alignItems: 'center', // Center vertically
        justifyContent: 'flex-start',
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: -30
    },
    verticalText: {
        fontSize: 16,
        writingDirection: 'ltr',
        transform: [{ rotate: '90deg' }],
        marginBottom: 20,
        color: "gray",
    },
    image: {
        width: 300,
        height: 250,
    },
    containerGraph: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerImport: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        marginTop: 20
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
});

export default TrackRecordDetails;
