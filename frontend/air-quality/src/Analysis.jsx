import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { addDataToFirestore } from '../config';

const Analysis = () => {
  // Sample data for adding to Firestore
    const sampleData = {
        label: 'Sample Data',
        value: 100,
    };

    // Function to handle press event
    const handlePress = () => {
        addDataToFirestore(sampleData); // Add sample data to Firestore
    };

    return (
        <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Analysis</Text>

        {/* TouchableOpacity to trigger adding data */}
        <TouchableOpacity onPress={handlePress}>
            <Text style={styles.button}>Add Sample Data to Firestore</Text>
        </TouchableOpacity>
        </SafeAreaView>
    );
    };

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#071414',
    },
    title: {
        color: 'white',
        fontSize: 30,
        marginTop: 50,
        marginBottom: 20,
    },
    button: {
        color: 'white',
        fontSize: 18,
        padding: 10,
        backgroundColor: '#1e90ff',
        borderRadius: 8,
        marginTop: 20,
    },
    });

    export default Analysis;
