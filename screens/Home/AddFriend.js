import { StyleSheet, Text, View, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { FirebaseFunctions } from "../../firebase";
import { useNavigation } from "@react-navigation/native";
import { TextInput, Button } from "react-native-paper";

const AddFriend = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [incomplete, setIncomplete] = useState(false);
  const [success, setSuccess] = useState(false);

  const firebase = new FirebaseFunctions();
  const navigation = useNavigation();

  useEffect(() => {
    displayAlert();
  }, [error, incomplete, success]);

  async function handleAddFriend() {
    const addFriendResponse = await firebase.addFriend(email);
    if (addFriendResponse.error) setError(addFriendResponse.error);
    if (addFriendResponse.incomplete) setIncomplete(addFriendResponse.incomplete);
    if (addFriendResponse.message) setSuccess(addFriendResponse.success);
  }

  function displayAlert() {
    if (error) {
      Alert.alert("Error", `${error.message}`, [{ text: "OK" }]);
      setError(false);
    }
    if (incomplete) {
      Alert.alert("Already friends", "", [{ text: "OK" }]);
      setIncomplete(false);
    }
    if (success) {
      Alert.alert("Friend Added!", "", [{ text: "OK" }]);
      setSuccess(false);
    }
  }

  return (
    <View style={styles.pageContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          value={email}
          mode="outlined"
          label="type in your friends email here"
          onChangeText={(txt) => setEmail(txt)}
        />
      </View>
      <View styles={styles.buttonContainer}>
        <Button mode="contained" onPress={handleAddFriend}>
          <Text style={styles.buttonText}>Add Friend</Text>
        </Button>
      </View>
    </View>
  );
};

export default AddFriend;

const styles = StyleSheet.create({
  pageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {},
  buttonText: {
    color: "white",
  },
  inputContainer: {
    marginTop: 50,
    width: "80%",
    padding: 10,
  },
});
