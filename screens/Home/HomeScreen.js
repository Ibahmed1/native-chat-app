import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { FirebaseFunctions } from "../../firebase";
import { useNavigation } from "@react-navigation/native";
import { TextInput, Button } from "react-native-paper";

const HomeScreen = () => {
  const [user, setUser] = useState(false);

  const firebase = new FirebaseFunctions();
  const navigation = useNavigation();

  useEffect(() => {
    async function gettingUser() {
      const user = await firebase.currentUser();
      if (user) {
        setUser(user);
      }
      return user;
    }
    gettingUser();
  }, []);

  function displayUser() {
    if (user) {
      return <Text>{user.email}</Text>;
    }
  }

  async function handleSignOut() {
    const signOut = await firebase.signOutUser();
    if (signOut) {
      navigation.replace("Login");
    }
  }

  return (
    <View style={styles.pageContainer}>
      <Text>HomeScreen</Text>
      {displayUser()}
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => {
            handleSignOut();
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}> Sign Out</Text>
        </Button>
      </View>
    </View>
  );
};

export default HomeScreen;

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
