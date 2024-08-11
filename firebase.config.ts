import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCRnoGJJ-bQx3E-jHouEaYHDt7YYCCI7Ww",
  authDomain: "database-cbd50.firebaseapp.com",
  projectId: "database-cbd50",
  storageBucket: "database-cbd50.appspot.com",
  messagingSenderId: "1088291899119",
  appId: "1:1088291899119:web:2112e9646b927a815b7d1a",
  measurementId: "G-RWKWXXK70B",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
