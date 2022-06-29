import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

const MessageCard = (props) => {
  function getStyle() {
    return props.message.sender_id === props.user.uid ? styles.messageSender : styles.messageReceiver;
  }

  return (
    <View style={getStyle()}>
      <Text>{props.message.message}</Text>
    </View>
  );
};

export default MessageCard;

const styles = StyleSheet.create({
  messageCardContainer: {
    margin: 10,
    backgroundColor: "pink",
    maxWidth: "40%",
    borderRadius: 10,
    padding: 3,
  },
  messageSender: {
    margin: 10,
    backgroundColor: "pink",
    maxWidth: "40%",
    borderRadius: 10,
    padding: 8,
    alignSelf: "flex-end",
  },
  messageReceiver: {
    margin: 10,
    backgroundColor: "pink",
    maxWidth: "40%",
    borderRadius: 10,
    padding: 8,
    alignSelf: "flex-start",
  },
});
