import { StyleSheet, Text, View, ScrollView, scrollToEnd, scrollViewRef } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { FirebaseFunctions } from "../../../firebase";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../../firebaseConfig";
import MessageCard from "./MessageCard";

const MessageList = (props) => {
  const [messages, setMessages] = useState(undefined);
  const [user, setUser] = useState(undefined);
  const [docId, setDocId] = useState(undefined);

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const unsub = docId
    ? onSnapshot(doc(db, "chats", docId), (doc) => {
        setMessages(doc.data().messages);
      })
    : null;

  const firebase = new FirebaseFunctions();
  const scrollViewRef = useRef();

  useEffect(() => {
    async function getMessages() {
      const chat = await firebase.getMessages(props.friendEmail);
      setDocId(chat.docId);
      setMessages(chat.messages);
    }
    async function getCurrentUser() {
      const user = await firebase.currentUser();
      setUser(user);
    }
    getMessages();
    getCurrentUser();
  }, []);

  return (
    <ScrollView
      ref={scrollViewRef}
      onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: false })}
      style={styles.messageListContainer}
    >
      {messages &&
        user &&
        messages.map((message, i) => {
          return <MessageCard key={i} message={message} user={user} />;
        })}
    </ScrollView>
  );
};

export default MessageList;

const styles = StyleSheet.create({
  messageListContainer: {
    backgroundColor: "white",
  },
});
