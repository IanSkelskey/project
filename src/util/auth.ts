import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { checkUserExists } from "./firestore";
import { auth } from "./firebase";

const provider = new GoogleAuthProvider();

export async function signInWithGoogle(setUserState: (state: { user: any; isNewUser: boolean }) => void) {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        if (user.email && !(await checkUserExists(user.email))) {
            setUserState({ user, isNewUser: true });
        } else {
            setUserState({ user, isNewUser: false });
        }
    } catch (error) {
        console.error('Error during sign-in:', error);
    }
}

export async function signOut(setUserState: (state: { user: any; isNewUser: boolean }) => void) {
    try {
        await auth.signOut();
        setUserState({ user: null, isNewUser: false });
    } catch (error) {
        console.error('Error during sign-out:', error);
    }
}