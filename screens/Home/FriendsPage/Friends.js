import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { FirebaseFunctions } from "../../../firebase";
import { useNavigation } from "@react-navigation/native";
import { TextInput, Button } from "react-native-paper";
import FriendsList from "./FriendsList";

const Friends = () => {
  const [user, setUser] = useState(false);
  const [friends, setFriends] = useState(false);

  const firebase = new FirebaseFunctions();
  const navigation = useNavigation();

  useEffect(() => {
    async function gettingUser() {
      const user = await firebase.currentUser();
      if (user) setUser(user);
      return user;
    }
    gettingUser();
  }, []);

  useEffect(() => {
    async function gettingFriends() {
      const friends = await firebase.getFriends();
      setFriends(friends);
      return friends;
    }
    gettingFriends();
  }, []);

  function loadFriendsList() {
    if (friends) {
      return <FriendsList friends={friends} />;
    }
  }

  function displayFriends() {
    return friends?.map((friend) => {
      return <Text>{friend["friend_id"]}</Text>;
    });
  }

  return <View style={styles.pageContainer}>{loadFriendsList()}</View>;
};

export default Friends;

const styles = StyleSheet.create({
  pageContainer: {},
});
