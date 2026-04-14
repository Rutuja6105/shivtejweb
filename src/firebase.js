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
  appId: "1:1037288518213:web:9af7f3a123ddc16b7f292c",
  measurementId: "G-V1GGFWPF93"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);