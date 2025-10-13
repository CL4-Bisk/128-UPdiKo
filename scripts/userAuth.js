import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInAnonymously } from "firebase/auth";

const auth = getAuth();

// Function to handle user registration
export function registerUser(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
}

// Function to handle user login
export function loginUser(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}

// Function to handle anonymous login
export function loginAnonymously() {
    return signInAnonymously(auth);
}