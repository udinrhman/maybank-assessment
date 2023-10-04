import { initializeApp } from "firebase/app";
import { getFirestore} from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDEbOcDEx1X62pCXmDK6GUp9WX4l-DfHUw",
    authDomain: "maybank-assessment-2349c.firebaseapp.com",
    projectId: "maybank-assessment-2349c",
    storageBucket: "maybank-assessment-2349c.appspot.com",
    messagingSenderId: "974574511953",
    appId: "1:974574511953:web:50f6ca9477f833e72b9570",
    measurementId: "G-N5XX1Q4HJ9"
  };

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);