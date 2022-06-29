import { StyleSheet, Text, KeyboardAvoidingView, View } from "react-native";
import React, { useState, useEffect } from "react";
import { FirebaseFunctions } from "../../../firebase";
import { useNavigation } from "@react-navigation/native";
import { IconButton, TextInput } from "react-native-paper";
import { Header } from "@react-navigation/stack";
import MessageList from "./MessageList";
import { mdiRoutes } from "@mdi/js";

const Messages = ({ route }) => {
  const [newMessage, setNewMessage] = useState("");

  const firebase = new FirebaseFunctions();

  async function handleSendMessage() {
    const response = await firebase.sendMessage(newMessage, route.params.name);
    console.log(response);
    setNewMessage("");
  }

  return (
    <View style={styles.pageContainer}>
      <View style={styles.messagesContainer}>
        <MessageList friendEmail={route.params.name} />
      </View>
      <KeyboardAvoidingView keyboardVerticalOffset={80} behavior="padding">
        <View style={styles.newMessageContainer}>
          <TextInput
            value={newMessage}
            multiline={true}
            style={styles.textInput}
            onChangeText={(text) => setNewMessage(text)}
          />
          <IconButton icon="send" size={40} onPress={handleSendMessage} />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: "blue",
  },
  textInput: {
    padding: 2,
    width: "80%",
    marginLeft: "4%",
  },
  newMessageContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 140,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});
