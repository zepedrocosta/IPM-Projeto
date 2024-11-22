import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, View, Text, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Car = {
    url: string;
    brand: string;
    model: string;
    year: string;
    plate: string;
};

const EditCar: React.FC = () => {
    const params = useLocalSearchParams();

    const [car, setCar] = useState<Car>({
        url: params.url.toString(),
        brand: params.brand.toString(),
        model: params.model.toString(),
        year: params.year.toString(),
        plate: params.plate.toString(),
    });

    const handleSave = () => {
        Alert.alert('Saved', 'Car details updated successfully!');
        router.push('/main');
    };

    const handleDelete = () => {
        Alert.alert('Delete Car', 'Are you sure you want to delete this car?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: () => {
                    Alert.alert('Deleted', 'The car has been deleted successfully!');
                    router.push('/main');
                },
            },
        ]);
    };

    return (
        <SafeAreaView>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                <View style={styles.topView}>
                    <AntDesign name="left" size={24} style={styles.backButton} onPress={() => router.push('/main')} />
                </View>
                <View style={styles.container}>
                    <Text style={styles.title}>Edit Car Details</Text>
                    <Pressable style={styles.button}>
                        <Text style={styles.buttonText}>
                            Change car picture
                        </Text>
                    </Pressable>
                    <TextInput
                        style={styles.input}
                        value={car.brand}
                        placeholder="Brand"
                        onChangeText={(text) => setCar({ ...car, brand: text })}
                    />
                    <TextInput
                        style={styles.input}
                        value={car.model}
                        placeholder="Model"
                        onChangeText={(text) => setCar({ ...car, model: text })}
                    />
                    <TextInput
                        style={styles.input}
                        value={car.year}
                        placeholder="Year"
                        keyboardType="numeric"
                        onChangeText={(text) => setCar({ ...car, year: text })}
                    />
                    <TextInput
                        style={styles.input}
                        value={car.plate}
                        placeholder="Plate Number"
                        onChangeText={(text) => setCar({ ...car, plate: text })}
                    />
                    <View style={styles.buttonContainer}>
                        <Pressable style={styles.deleteButton} onPress={handleDelete}>
                            <Text style={styles.buttonText}>Delete</Text>
                        </Pressable>
                        <Pressable style={styles.saveButton} onPress={handleSave}>
                            <Text style={styles.buttonText}>Save</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default EditCar;

const styles = StyleSheet.create({
    topView: {
        display: 'flex',
        justifyContent: 'flex-start',
        padding: 10,
    },
    backButton: {
        color: "#007aff",
    },
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    saveButton: {
        flex: 1,
        padding: 12,
        alignItems: 'center',
        backgroundColor: "rgba(33,150,243,1.00)",
        paddingVertical: 10,
        borderRadius: 2,
        marginBottom: 20,
        borderColor: "black",
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    deleteButton: {
        flex: 1,
        padding: 12,
        alignItems: 'center',
        marginRight: 10,
        backgroundColor: "red",
        paddingVertical: 10,
        borderRadius: 2,
        marginBottom: 20,
        borderColor: "black",
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    button: {
        backgroundColor: 'rgba(33,150,243,1.00)',
        padding: 10,
        borderRadius: 2,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 20
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
