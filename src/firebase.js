import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfCwcPtKqEdnFSO1ayz1swzxwLra501rg",
  authDomain: "shivtej-21af6.firebaseapp.com",
  projectId: "shivtej-21af6",
  storageBucket: "shivtej-21af6.firebasestorage.app",
  messagingSenderId: "1037288518213",
  appId: "1:1037288518213:web:21088e50db068cad7f292c",
  measurementId: "G-5DZ4WC01L0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);