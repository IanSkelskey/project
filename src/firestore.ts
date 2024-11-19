import { User } from './model/User';
import { db } from './firebase-config';
import { collection, getDocs, query, where, setDoc, doc } from 'firebase/firestore';

// Get a user document from firestore based on email
async function getUserByEmail(email: string): Promise<User> {
    // Create a query to get user document based on email
    const usersRef = collection(db, 'User');
    const q = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    // Return the first user document found
    return querySnapshot.docs[0].data() as User;
}

async function createUser(user: User): Promise<void> {
    // Add user document to firestore
    await setDoc(doc(db, 'User', user.id), user);
}