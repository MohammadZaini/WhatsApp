// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "@firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBxb_2eCatPcFV_5j-qdClXA3dDoQhqsL8",
    authDomain: "whatsapp-621ae.firebaseapp.com",
    projectId: "whatsapp-621ae",
    storageBucket: "whatsapp-621ae.appspot.com",
    messagingSenderId: "187659609160",
    appId: "1:187659609160:web:37a55e14d4dbb3ff4ee47d",
    measurementId: "G-TKKS2TQ7E0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);