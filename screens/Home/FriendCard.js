import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState, useEffect } from "react";
import { FirebaseFunctions } from "../../firebase";
import { useNavigation } from "@react-navigation/native";
import { TextInput, Button } from "react-native-paper";

const FriendCard = (props) => {
  const [friendInfo, setFriendInfo] = useState(false);

  const firebase = new FirebaseFunctions();
  const navigation = useNavigation();

  useEffect(() => {
    async function gettingFriendInfo() {
      const friendInfo = await firebase.getUserInfo(props.friend.friend_id);
      setFriendInfo(friendInfo);
    }
    gettingFriendInfo();
  }, []);

  function handlePress() {
    navigation.navigate("Messages", { name: friendInfo.email });
  }

  function displayFriendEmail() {
    if (friendInfo) return <Text>{friendInfo.email}</Text>;
  }
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={handlePress}>
      {displayFriendEmail()}
    </TouchableOpacity>
  );
};

export default FriendCard;

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    margin: 10,
    backgroundColor: "white",
  },
});
