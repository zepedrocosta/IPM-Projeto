import { AntDesign } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Button, Pressable, StyleSheet, View, Text, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from "expo-image-picker";


type Car = {
    url: string;
    brand: string;
    model: string;
    year: string;
    plate: string;
};

const Car: React.FC = () => {
    const params = useLocalSearchParams();
    console.log(params.url.toString())

    const [car, setCar] = useState<Car>({
        url: params.url.toString(),
        brand: params.brand.toString(),
        model: params.model.toString(),
        year: params.year.toString(),
        plate: params.plate.toString(),
    });

    const navigateToDocuments = (car: Car) => {
        router.push({
            pathname: '/documents',
            params: {
                url: car.url,
                brand: car.brand,
                model: car.model,
                year: car.year,
                plate: car.plate,
            },
        });
    };

    const navigateToServices = () => {
        router.push('/services');
    };

    const navigateToMain = () => {
        router.push('/main');
    };

    const navigateToLocation = (car: Car) => {
        router.push({
            pathname: '/location',
            params: {
                url: car.url,
                brand: car.brand,
                model: car.model,
                year: car.year,
                plate: car.plate,
            },
        });
    };

    const navigateToStats = () => { // TODO: Stats page
        router.push('/main');
    };

    const navigateToTrackRecords = () => { // TODO: Track Records page
        router.push('/main');
    };

    const getLocalUri = async (path: string) => {
        const fileInfo = await FileSystem.getInfoAsync(path);
        console.log('File exists:', fileInfo.exists);
        return fileInfo.exists;
    };

    const CustomButton = ({ title, onPress }: { title: string; onPress: () => void }) => (
        <Pressable style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
            <AntDesign style={styles.rightArrow} name="right" size={24} color="black" />
        </Pressable>
    );

    return (
        <SafeAreaView>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                <AntDesign name="left" size={24} style={styles.backButton} onPress={navigateToMain} />
                <View style={styles.carInfoContainer}>
                    <Image source={{ uri: car.url }} style={styles.image} />
                    <View style={styles.carBrand}><Text style={styles.carBrandText}>{car.brand} {car.model}</Text></View>
                    <View style={styles.carPlate}>
                        <Text style={styles.carPlateText}>{car.plate}</Text>
                    </View>
                </View>
                <View style={styles.optionsContainer}>
                    <View style={styles.carGroupingContainer}>
                        <Text style={styles.infoTitle}>Info</Text>
                        <View style={styles.carButtonLess}>
                            <CustomButton title="Location" onPress={() => navigateToLocation(car)} />
                        </View>
                        <View style={styles.carButton}>
                            <CustomButton title="Services" onPress={navigateToServices} />
                        </View>
                        <View style={styles.carButton}>
                            <CustomButton title="Documents" onPress={() => navigateToDocuments(car)} />
                        </View>
                    </View>
                    <View style={styles.carGroupingContainerEnd}>
                        <Text style={styles.performanceTitle}>Performance</Text>
                        <View style={styles.carButtonLess}>
                            <CustomButton title="Stats" onPress={navigateToStats} />
                        </View>
                        <View style={styles.carButton}>
                            <CustomButton title="Track Records" onPress={navigateToTrackRecords} />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Car;

const styles = StyleSheet.create({
    carInfoContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 15
    },
    carBrand: {
        marginBottom: 8,
        marginTop: 5
    },
    carBrandText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#333',
    },
    carPlate: {
        padding: 8,
        paddingBottom: 4,
        paddingTop: 4,
        borderColor: '#ddd',
        borderRadius: 4,
        backgroundColor: '#f9f9f9',
        marginTop: 5
    },
    carPlateText: {
        fontSize: 22,
    },
    optionsContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 30
    },
    image: {
        borderRadius: 15,
        height: 160,
        width: '100%',  // Ensures that the image fills the width
        maxWidth: 390,
        resizeMode: 'cover',  // This can help scale the image
    },
    carButton: {
        padding: 15,
        width: '80%',
        fontSize: 20
    },
    carButtonLess: {
        marginTop: 5,
        padding: 15,
        width: '80%',
        fontSize: 25
    },
    carGroupingContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    carGroupingContainerEnd: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 20
    },
    infoTitle: {
        marginBottom: 0,
        fontSize: 25
    },
    performanceTitle: {
        marginBottom: 0,
        marginTop: 23,
        fontSize: 25
    },
    backButton: {
        padding: 22,
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
