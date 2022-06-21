// Import the functions you need from the SDKs you need
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2hVUQ4sevlD3a99fkQWsnY-YtxhzAKRM",
  authDomain: "native-chat-cfcdc.firebaseapp.com",
  projectId: "native-chat-cfcdc",
  storageBucket: "native-chat-cfcdc.appspot.com",
  messagingSenderId: "513733850624",
  appId: "1:513733850624:web:31af6a6b6b1d4d470dcae5",
  measurementId: "G-MDDDMKNSM9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore(app);

class FirebaseFunctions {
  constructor() {
    this.auth = auth;
    this.db = db;
  }
  async createAccount(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      return user;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      return errorMessage;
    }
  }
  async signIn(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      return user;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      return errorMessage;
    }
  }

  async authentication() {
    try {
      const user = onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          return user;
        } else {
          return false;
        }
      });
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      return errorMessage;
    }
  }

  async currentUser() {
    return auth.currentUser;
  }

  async signOutUser() {
    try {
      await signOut(auth);
      return true;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      return errorMessage;
    }
  }

  async addFriend(email) {}
}

export { FirebaseFunctions };
