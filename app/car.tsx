import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Button, Pressable, StyleSheet, View, Text } from 'react-native';

type Car = {
    url: string;
    brand: string;
    model: string;
    year: string;
    plate: string;
};

const Car: React.FC = () => {
    const params = useLocalSearchParams();

    const [car, setCar] = useState<Car>({
        url: params.url.toString(),
        brand: params.brand.toString(),
        model: params.model.toString(),
        year: params.year.toString(),
        plate: params.plate.toString(),
    });

    const navigateToDocuments = () => {
        router.push('/documents');
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

    const CustomButton = ({ title, onPress }: { title: string; onPress: () => void }) => (
        <Pressable style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
            <AntDesign style={styles.rightArrow} name="right" size={24} color="black" />
        </Pressable>
    );

    return (
        <div style={{ marginTop: '20px' }}> {/**TODO: fix scrolls */}
            <AntDesign name="left" size={24} style={styles.backButton} onPress={navigateToMain} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '15px' }}>
                <img src={car.url} height='160px' max-width='390' style={{ borderRadius: '15px' }} />
                <div style={{
                    marginBottom: '8px',
                    fontSize: '25px',
                    fontWeight: 'bold',
                    color: '#333',
                    marginTop: 5
                }}>{car.brand} {car.model}</div>
                <div style={{
                    padding: '4px 8px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '22px',
                    backgroundColor: '#f9f9f9',
                    width: 'fit-content',
                    marginTop: 5
                }}>
                    {car.plate}
                </div>
            </div>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '30px' }}>
                <div style={styles.carGroupingContainer}>
                    <p style={{ marginBottom: '0', fontSize: '25px' }}>Info</p>
                    <View style={styles.carButtonLess}>
                        <CustomButton title="Location" onPress={() => navigateToLocation(car)} />
                    </View>
                    <View style={styles.carButton}>
                        <CustomButton title="Services" onPress={navigateToServices} />
                    </View>
                    <View style={styles.carButton}>
                        <CustomButton title="Documents" onPress={navigateToDocuments} />
                    </View>
                </div>
                <div style={styles.carGroupingContainer}>
                    <p style={{ marginBottom: '0', marginTop: '23px', fontSize: '25px' }}>Performance</p>
                    <View style={styles.carButtonLess}>
                        <CustomButton title="Stats" onPress={navigateToStats} />
                    </View>
                    <View style={styles.carButton}>
                        <CustomButton title="Track Records" onPress={navigateToTrackRecords} />
                    </View>
                </div>
            </div>
        </div>
    );
};

export default Car;


const styles = StyleSheet.create({
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
