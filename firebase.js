// Import the functions you need from the SDKs you need
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
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

class FirebaseFunctions {
  constructor() {
    this.auth = auth;
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
}

export { FirebaseFunctions };
