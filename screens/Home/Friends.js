import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { FirebaseFunctions } from "../../firebase";
import { useNavigation } from "@react-navigation/native";
import { TextInput, Button } from "react-native-paper";

const Friends = () => {
  const [user, setUser] = useState(false);

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

  function displayUserEmail() {
    console.log(user);
    return <Text>{user?.email}</Text>;
  }

  return (
    <View style={styles.pageContainer}>
      <Text>Friends</Text>
      {displayUserEmail()}
    </View>
  );
};

export default Friends;

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
