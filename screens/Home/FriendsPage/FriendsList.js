import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { FirebaseFunctions } from "../../../firebase";
import { useNavigation } from "@react-navigation/native";
import { TextInput, Button } from "react-native-paper";
import FriendCard from "./FriendCard";

const FriendsList = (props) => {
  return (
    <View style={styles.pageContainer}>
      <ScrollView>
        {props.friends?.map((friend) => {
          return <FriendCard friend={friend} />;
        })}
      </ScrollView>
    </View>
  );
};

export default FriendsList;

const styles = StyleSheet.create({
  pageContainer: {
    height: "100%",
  },
});
