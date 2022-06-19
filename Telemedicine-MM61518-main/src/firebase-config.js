import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyA4rfht90AtclcxsGlrjnBe1OKYH2SByrg",
  authDomain: "telemedicine-optho.firebaseapp.com",
  projectId: "telemedicine-optho",
  storageBucket: "telemedicine-optho.appspot.com",
  messagingSenderId: "798454725309",
  appId: "1:798454725309:web:4d04deb07ef18308dad5d4"
};

export const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

export const db = getFirestore();

export const database = getDatabase();