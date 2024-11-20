// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyC7V_OpEO0OGdfSAquzxh0ox8DX4IR21Xs',
    authDomain: 'project-1be6c.firebaseapp.com',
    projectId: 'project-1be6c',
    storageBucket: 'project-1be6c.firebasestorage.app',
    messagingSenderId: '39433931464',
    appId: '1:39433931464:web:1967b4fd44f2faa192f3fd',
    measurementId: 'G-H0RYR7CHPL',
};

initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();

export { db, auth };
