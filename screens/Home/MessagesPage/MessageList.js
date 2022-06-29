import { StyleSheet, Text, View, ScrollView, scrollToEnd, scrollViewRef } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { FirebaseFunctions } from "../../../firebase";
import MessageCard from "./MessageCard";

const MessageList = (props) => {
  const [messages, setMessages] = useState(undefined);
  const [user, setUser] = useState(undefined);

  const firebase = new FirebaseFunctions();
  const scrollViewRef = useRef();

  useEffect(() => {
    async function getMessages() {
      const messages = await firebase.getMessages(props.friendEmail);
      setMessages(messages);
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
      onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
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
