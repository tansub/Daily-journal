import { initializeApp, getApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBT8WiX3hJSukktEzYegFxldXRr8wdgU38",
  authDomain: "daily-project-ba10b.firebaseapp.com",
  projectId: "daily-project-ba10b",
  storageBucket: "daily-project-ba10b.firebasestorage.app",
  messagingSenderId: "1006030813853",
  appId: "1:1006030813853:web:f97794b1a0c6797c7f3274",
  measurementId: "G-XG3X9PG4JR",
};

var app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  const APPS = getApps();
  app = APPS[0];
}

export const db = getDatabase(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
