import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyC3Fhd1NsxhWKQ_MbqZoiXD93jU6KyjPG0",
  authDomain: "deltax-8c2d9.firebaseapp.com",
  databaseURL: "https://deltax-8c2d9-default-rtdb.firebaseio.com",
  projectId: "deltax-8c2d9",
  storageBucket: "deltax-8c2d9.appspot.com",
  messagingSenderId: "387173460319",
  appId: "1:387173460319:web:93080a3ad64044d8daaeea",
  measurementId: "G-8FX0WP7SSJ"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Firestore exports
export const firestore = firebase.firestore();
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
export const fromMillis = firebase.firestore.Timestamp.fromMillis;
export const increment = firebase.firestore.FieldValue.increment;

// Storage exports
export const storage = firebase.storage();
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;
