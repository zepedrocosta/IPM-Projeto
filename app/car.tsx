import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import {AntDesign} from "@expo/vector-icons"

type Car = {
  url: string;
  brand: string;
  model: string;
  year: string;
  plate: string;
};

const Car: React.FC = () => {
    const [car, setCar] = useState<Car>({
        url: 'https://upload.wikimedia.org/wikipedia/pt/c/c2/Peter_Griffin.png',
        brand: 'FORD',
        model: 'MUSTANG MACH 1',
        year: "1969",
        plate: 'XX-01-XX',
    });

  const navigateToDocuments = () => {
    router.push("/documents");
  };

  const navigateToServices = () => {
    router.push("/services");
  };

    const navigateToMain = () => {
        router.push('/main');
    };

    const navigateToStats = () => { // TODO: Stats page
        router.push('/main');
    };

    const navigateToTrackRecords = () => { // TODO: Track Records page
        router.push('/main');
    };

    const CustomButton = ({ title, onPress }: { title: string; onPress: () => void }) => (
        <Pressable style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
            <AntDesign style={styles.rightArrow} name="right" size={24} color="black" />
        </Pressable>
    );

    return (
        <View style={{ marginTop: 30 }}>
            <AntDesign name="left" size={24} style={styles.backButton} onPress={navigateToMain} />
            {/**TODO: fix scrolls */}
            <View
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Image source={{ uri: car.url }} style={{ height: 160, width: 160 }} />
                <View style={styles.carBrandModel}>
                    {car.brand} {car.model}
                </View>
                <View style={styles.carPlate}>{car.plate}</View>
            </View>
            <View style={styles.carMain}>
                <View style={styles.carGroupingContainer}>
                    <Text style={{ marginBottom: 0 }}>Info</Text>
                    <View style={styles.carButtonLess}>
                        <CustomButton title="Location" onPress={navigateToMain} />
                    </View>
                    <View style={styles.carButton}>
                        <CustomButton title="Services" onPress={navigateToServices} />
                    </View>
                    <View style={styles.carButton}>
                        <CustomButton title="Documents" onPress={navigateToDocuments} />
                    </View>
                </View>
                <View style={styles.carGroupingContainer}>
                    <p style={{ marginBottom: "0", marginTop: "23px" }}>Performance</p>
                    <View style={styles.carButtonLess}>
                        <CustomButton title="Stats" onPress={navigateToStats} />
                    </View>
                    <View style={styles.carButton}>
                        <CustomButton title="Track Records" onPress={navigateToTrackRecords} />
                    </View>
                </View>
            </View>
        </View>
    );
};

export default Car;

const styles = StyleSheet.create({
  carMain: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 30,
  },
  carButton: {
    padding: 10,
    width: 190,
    fontSize: 15,
  },
  carButtonLess: {
    marginTop: 5,
    padding: 10,
    width: 190,
    fontSize: 15,
  },
  carGroupingContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  carBrandModel: {
    marginBottom: 8,
    fontSize: 25,
    fontWeight: "bold",
    color: "#333",
    marginTop: 5,
  },
  carPlate: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    fontSize: 22,
    backgroundColor: "#f9f9f9",
    width: "auto",
    marginTop: 5,
  },
    backButton: {
        padding: 20,
        marginTop: 20
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: 'rgba(33,150,243,1.00)',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 2,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    arrow: {
        width: 'auto',
        textAlignVertical: 'center'
    },
    rightArrow: {
        color: '#fff'
    }
});
