import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { FirebaseFunctions } from "../../firebase";
import { useNavigation } from "@react-navigation/native";
import { TextInput, Button } from "react-native-paper";

const Messages = () => {
  return (
    <View style={styles.pageContainer}>
      <Text>Messages</Text>
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonText: {
    color: "white",
  },
});
