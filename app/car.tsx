import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

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

    return (
        <div style={{ marginTop: '30px' }}> {/**TODO: fix scrolls */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img src={car.url} height='160px' />
                <div style={{ fontSize: '20px', marginTop: '15px' }}>{car.brand} {car.model}</div>
                <div style={{ border: '1px solid #000', padding: '2px 4px', marginTop: '12px', width: 'fit-content' }}>
                    {car.plate}
                </div>
            </div>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '30px' }}>
                <div style={styles.carGroupingContainer}>
                    <p style={{ marginBottom: '0' }}>Info</p>
                    <button style={styles.carButtonLess}>Location</button>
                    <button style={styles.carButton}>Services</button>
                    <button style={styles.carButton}>Documents</button>
                </div>
                <div style={styles.carGroupingContainer}>
                    <p style={{ marginBottom: '0', marginTop: '23px' }}>Performance</p>
                    <button style={styles.carButtonLess}>Stats</button>
                    <button style={styles.carButton}>Track Records</button>
                </div>
            </div>
        </div>
    );
};

export default Car;


const styles = StyleSheet.create({
    carButton: {
        marginTop: 25,
        padding: 10,
        width: 190,
        fontSize: 15
    },
    carButtonLess: {
        marginTop: 12,
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
