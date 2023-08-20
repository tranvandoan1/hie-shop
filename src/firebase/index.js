// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { FacebookAuthProvider, GoogleAuthProvider, getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBc9EtVyb2EL_wImBIXHw-1sPMXiJ_8iZU",
  authDomain: "hieshop-df804.firebaseapp.com",
  projectId: "hieshop-df804",
  storageBucket: "hieshop-df804.appspot.com",
  messagingSenderId: "82865750971",
  appId: "1:82865750971:web:cfb581d6801493d93bba9e",
  measurementId: "G-9NDR6TTK8K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const providerGoogle = new GoogleAuthProvider()
export const providerFacebook = new FacebookAuthProvider()
