import { router } from 'expo-router';
import React, { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';

type Car = {
    url: string;
    brand: string;
    model: string;
    year: number;
    plate: string;
};

const Car: React.FC = () => {
    const [car, setCar] = useState<Car>({
        url: 'https://upload.wikimedia.org/wikipedia/pt/c/c2/Peter_Griffin.png',
        brand: 'FORD',
        model: 'MUSTANG MACH 1',
        year: 1969,
        plate: 'XX-01-XX',
    });

    const navigateToDocuments = () => {
        router.push('/documents'); // Navigate to the register page
    };

    return (
        <div style={{ marginTop: '30px' }}> {/**TODO: fix scrolls */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img src={car.url} height='160px' />
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
                    <p style={{ marginBottom: '0' }}>Info</p>
                    <View style={styles.carButtonLess}>
                        <Button title="Location" />
                    </View>
                    <View style={styles.carButton}>
                        <Button title="Services" />
                    </View>
                    <View style={styles.carButton}>
                        <Button title="Documents" onPress={navigateToDocuments} />
                    </View>
                </div>
                <div style={styles.carGroupingContainer}>
                    <p style={{ marginBottom: '0', marginTop: '23px' }}>Performance</p>
                    <View style={styles.carButtonLess}>
                        <Button title="Stats" />
                    </View>
                    <View style={styles.carButton}>
                        <Button title="Track Records" />
                    </View>
                </div>
            </div>
        </div>
    );
};

export default Car;


const styles = StyleSheet.create({
    carButton: {
        padding: 10,
        width: 190,
        fontSize: 15
    },
    carButtonLess: {
        marginTop: 5,
        padding: 10,
        width: 190,
        fontSize: 15
    },
    carGroupingContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
});
