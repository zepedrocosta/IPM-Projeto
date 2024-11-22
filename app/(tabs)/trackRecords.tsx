import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Flex } from "@mantine/core";
import TrackRecord from "@/components/TrackRecord";

export default function TrackRecords() {
    const params = useLocalSearchParams();

    const [car, setCar] = useState({
        imageURL: params.url.toString(),
        brand: params.brand.toString(),
        model: params.model.toString(),
        year: params.year.toString(),
        plate: params.plate.toString(),
    });

    const router = useRouter();

    const navigateToCarPage = () => {
        router.push({
            pathname: "/car",
            params: {
                url: car.imageURL,
                brand: car.brand,
                model: car.model,
                year: car.year,
                plate: car.plate,
            },
        });
    };

    const navigateToTrackHistory = () => {
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
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <SafeAreaView style={styles.topBar}>
                <AntDesign name="left" size={24} style={styles.backButton} onPress={navigateToTrackHistory} />
                <Text style={styles.topTextBar}>{car.brand} {car.model} {car.plate}</Text>
            </SafeAreaView>
            <View style={styles.trackRecordContainer}>
                <Text style={styles.statsText}>Stats</Text>
                <View style={styles.wheelContainer}>
                    <View style={styles.wheelsLeft}>
                        <View>
                            <Text>B: 347°C</Text>
                            <Text>T: 81°C</Text>
                            <Text>P: 2.32 bar</Text>
                        </View>
                        <View>
                            <Text>B: 362°C</Text>
                            <Text>T: 83°C</Text>
                            <Text>P: 2.41 bar</Text>
                        </View>
                    </View>
                    <View style={styles.imageContainer}>
                        <Image source={require("../../assets/images/bellow-car-view.png")} style={styles.image} />
                    </View>
                    <View style={styles.wheelsRight}>
                        <View>
                            <Text>B: 339°C</Text>
                            <Text>T: 77°C</Text>
                            <Text>P: 2.24 bar</Text>
                        </View>
                        <View>
                            <Text>B: 358°C</Text>
                            <Text>T: 84°C</Text>
                            <Text>P: 2.36 bar</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.captionContainer}>
                    <Text style={styles.captionText}>B: Brake Temperature</Text>
                    <Text style={styles.captionText}>T: Tire Temperature</Text>
                    <Text style={styles.captionText}>P: Tire Pressure</Text>
                </View>
                <TrackRecord car={car} />
            </View>
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
    statsText: {
        fontSize: 20,
        marginBottom: 20
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
    trackRecordContainer: {
        width: "100%",
        paddingHorizontal: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    wheelContainer: {
        display: 'flex',
        justifyContent: 'space-evenly',
        flexDirection: 'row'
    },
    wheelsLeft: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginRight: 5
    },
    wheelsRight: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginLeft: 5
    },
    captionContainer: {
        marginTop: 10,
        paddingHorizontal: 20,
    },
    captionText: {
        fontSize: 11,
        color: "gray",
        marginBottom: 5,
        textAlign: 'center'
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
    imageContainer: {
        width: 'auto',
        padding: 5,
    },
    image: {
        height: 180,
        borderRadius: 20,
        resizeMode: 'contain',
        maxWidth: 120,
    }
});
