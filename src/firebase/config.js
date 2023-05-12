import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC2FtGeILVGYjVa9JfXBmd38NUJx5lZ0gE",
  authDomain: "chatter-app-391d3.firebaseapp.com",
  projectId: "chatter-app-391d3",
  storageBucket: "chatter-app-391d3.appspot.com",
  messagingSenderId: "4801730698",
  appId: "1:4801730698:web:cabf268ae57d272d497573",
};

// init firebase
firebase.initializeApp(firebaseConfig);

// timestamp
export const timestamp = firebase.firestore.Timestamp;

// init services
export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
