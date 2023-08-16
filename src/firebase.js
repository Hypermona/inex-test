// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCugmangmfCXiUSfEYdfbAIDRWyYLX-Fpc",
  authDomain: "inex-test-38378.firebaseapp.com",
  projectId: "inex-test-38378",
  storageBucket: "inex-test-38378.appspot.com",
  messagingSenderId: "537267661752",
  appId: "1:537267661752:web:ea341c189382e5a2883d4d",
  measurementId: "G-2XS3N93H1H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export { auth, analytics, db };
