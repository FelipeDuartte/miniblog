import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBLdYolKbm1S_A2oCd2kxzRY0RIAs3Fq-I",
  authDomain: "miniblog-5d56a.firebaseapp.com",
  projectId: "miniblog-5d56a",
  storageBucket: "miniblog-5d56a.firebasestorage.app",
  messagingSenderId: "861258089100",
  appId: "1:861258089100:web:e5544aaa2c7807e62371a9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db, app };