import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgrySwsLCFqIQYDX_yYPAF_G36GJVlpvA",
  authDomain: "money-mentor-b9e8d.firebaseapp.com",
  projectId: "money-mentor-b9e8d",
  storageBucket: "money-mentor-b9e8d.firebasestorage.app",
  messagingSenderId: "48851034506",
  appId: "1:48851034506:web:c99d0ce0a92b51d3526873",
  measurementId: "G-G82SVD861X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Authentication functions
export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error) {
    console.error("Error signing in:", error);
    return { user: null, error: error };
  }
};

export const signUp = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error) {
    console.error("Error signing up:", error);
    return { user: null, error: error };
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    return { success: true, error: null };
  } catch (error) {
    console.error("Error signing out:", error);
    return { success: false, error: error };
  }
};

// Auth state observer
export const subscribeToAuthChanges = (
  callback: (user: User | null) => void
) => {
  return onAuthStateChanged(auth, callback);
};

// Helper to get error message from Firebase error
export const getAuthErrorMessage = (error: any): string => {
  if (!error || !error.code) return "An unknown error occurred";
  
  const errorCode = error.code;
  switch (errorCode) {
    case 'auth/invalid-email':
      return "Invalid email address format.";
    case 'auth/user-disabled':
      return "This account has been disabled.";
    case 'auth/user-not-found':
      return "No account found with this email.";
    case 'auth/wrong-password':
      return "Incorrect password.";
    case 'auth/email-already-in-use':
      return "An account with this email already exists.";
    case 'auth/weak-password':
      return "Password is too weak. Use at least 6 characters.";
    case 'auth/operation-not-allowed':
      return "This operation is not allowed.";
    case 'auth/network-request-failed':
      return "Network error. Check your connection.";
    default:
      return "An error occurred during authentication.";
  }
};
