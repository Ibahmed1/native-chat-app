import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import { TextInput, Button } from "react-native-paper";
import React, { useState } from "react";
import { FirebaseFunctions } from "../firebase";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureInput, setSecureInput] = useState(true);

  const firebase = new FirebaseFunctions();

  async function handleCreateAccount(email, password) {
    const user = await firebase.createAccount(email, password);
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput value={email} mode="outlined" label="email" onChangeText={(txt) => setEmail(txt)} />
        <TextInput
          value={password}
          secureTextEntry={secureInput}
          mode="outlined"
          label="password"
          onChangeText={(txt) => setPassword(txt)}
          right={<TextInput.Icon name="eye" onPress={() => setSecureInput(!secureInput)} />}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          <Button
            mode="outlined"
            onPress={() => {
              handleCreateAccount(email, password);
            }}
            style={styles.button}
          >
            <Text style={styles.createAccButtonText}>Create account</Text>
          </Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button mode="contained" onPress={() => {}} style={styles.button}>
            <Text style={styles.buttonText}> Sign in</Text>
          </Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    width: "80%",
    justifyContent: "center",
    padding: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    padding: 10,
  },
  buttonText: {
    color: "white",
  },
  createAccButtonText: {
    color: "#6ACC01",
  },
});
