import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Ye line Firestore ke liye zaroori hai

// TODO: Apni purani Firebase config keys yahan daal sakte ho, 
// par error hatane ke liye ye temporary setup ek dum sahi kaam karega.
const firebaseConfig = {
  apiKey: "AIzaSyDummyKeyHere-123456",
  authDomain: "digital-agency.firebaseapp.com",
  projectId: "digital-agency",
  storageBucket: "digital-agency.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Asli database export jise Admin.jsx dhoodh raha hai:
export const db = getFirestore(app); 

export default app;