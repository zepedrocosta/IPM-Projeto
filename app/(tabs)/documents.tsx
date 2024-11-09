import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';

export default function Documents() {

    return (
        <View style={styles.container}>
            <p>No documents added...</p>

            <View style={styles.documentsContainer}>
                {/** We will have several of these document views. Each one represents a document */}
                <View style={styles.document}>
                    <b>Document 1</b>
                    <View style={styles.iconsContainer}>
                        <TouchableOpacity style={styles.iconButton}>
                            <MaterialIcons name="cloud-download" size={20} color="green" />
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <MaterialIcons name="delete" size={20} color="red" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    documentsContainer:{
        flexDirection: 'column',
    },
    document: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10
    },
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconButton: {

    }
});