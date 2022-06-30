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
import { firebaseConfig } from "./firebaseConfig.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

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

  async getUserInfo(id) {
    const response = await fetch(`http://localhost:5001/native-chat-cfcdc/us-central1/app/user?id=${id}`);
    const userInfo = await response.json();
    return userInfo;
  }

  async addFriend(email) {
    const verifyEmailExists = await fetch(
      `http://localhost:5001/native-chat-cfcdc/us-central1/app/user?email=${email}`
    );
    const emailExists = await verifyEmailExists.json();
    if (emailExists.error) return emailExists;
    try {
      const user = await this.currentUser();
      const response = await fetch("http://localhost:5001/native-chat-cfcdc/us-central1/app/friends", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: user.email,
          friendEmail: email,
        }),
      });
      return await response.json();
    } catch (error) {
      return error;
    }
  }

  async getFriends() {
    const user = await this.currentUser();
    const response = await fetch(`http://localhost:5001/native-chat-cfcdc/us-central1/app/friends?email=${user.email}`);
    const friends = await response.json();
    return friends.friends;
  }

  async sendMessage(message, friendEmail) {
    const user = await this.currentUser();
    try {
      const response = await fetch("http://localhost:5001/native-chat-cfcdc/us-central1/app/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderEmail: user.email,
          receiverEmail: friendEmail,
          message: message,
        }),
      });
      return await response.json();
    } catch (error) {
      return { error: error };
    }
  }

  async getMessages(friendEmail) {
    const user = await this.currentUser();
    const response = await fetch(
      `http://localhost:5001/native-chat-cfcdc/us-central1/app/messages?userEmail=${user.email}&friendEmail=${friendEmail}`
    );
    const chat = await response.json();
    return chat;
  }
}

export { FirebaseFunctions };
