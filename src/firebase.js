// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCyTexZBXlR582orWDBUXd87kLQ17mc5iM",
  authDomain: "hidden-objects-d0678.firebaseapp.com",
  projectId: "hidden-objects-d0678",
  storageBucket: "hidden-objects-d0678.appspot.com",
  messagingSenderId: "13146780612",
  appId: "1:13146780612:web:04441d626da947500aea91",
  measurementId: "G-P42FJHKG2Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
