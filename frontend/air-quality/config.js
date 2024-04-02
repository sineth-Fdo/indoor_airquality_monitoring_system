import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/firestore'; // Import Firestore

const firebaseConfig = {
    apiKey: "AIzaSyDFEFKQ-Y9xRFy97PlD9WiZ5oZ4G6TF-LU",
    authDomain: "iotproject-3ecb9.firebaseapp.com",
    databaseURL: "https://iotproject-3ecb9-default-rtdb.firebaseio.com",
    projectId: "iotproject-3ecb9",
    storageBucket: "iotproject-3ecb9.appspot.com",
    messagingSenderId: "868825190443",
    appId: "1:868825190443:web:eaf6890f0cf493e9d7da6e"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const db = firebase.database(); // Get a reference to the Realtime Database service
const firestore = firebase.firestore(); // Get a reference to the Firestore service

// Function to add data to Firestore
const addDataToFirestore = async (data) => {
    try {
        // Add data to a Firestore collection
        await firestore.collection('analysis').add(data);
        console.log('Data added to Firestore successfully!');
    } catch (error) {
        console.error('Error adding data to Firestore: ', error);
    }
};

export { db, addDataToFirestore }; // Export Firestore function as well
