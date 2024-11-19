// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { checkUserExists } from './firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const provider = new GoogleAuthProvider();
const auth = getAuth();
const db = getFirestore();

export async function signInWithGoogle(setUserState) {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        if (!(await checkUserExists(user.email))) {
            // If the user does not exist, start onboarding
            setUserState({ user, isNewUser: true });
        } else {
            // Existing user, load dashboard data
            setUserState({ user, isNewUser: false });
        }
    } catch (error) {
        console.error('Error during sign-in:', error);
    }
}

export { auth, provider, db };
