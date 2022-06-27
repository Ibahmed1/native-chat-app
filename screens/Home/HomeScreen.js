import { StyleSheet, Text, View, Button } from "react-native";
import React, { useState, useEffect } from "react";
import { FirebaseFunctions } from "../../firebase";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { IconButton } from "react-native-paper";
import Friends from "./FriendsPage/Friends";
import Messages from "./MessagesPage/Messages";
import AddFriend from "./AddFriend";

const Stack = createNativeStackNavigator();

const HomeScreen = () => {
  const firebase = new FirebaseFunctions();
  const navigation = useNavigation();

  async function handleSignOut() {
    const signOut = await firebase.signOutUser();
    if (signOut) {
      navigation.replace("Login");
    }
  }

  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="Friends"
          component={Friends}
          options={{
            headerRight: () => <Button onPress={handleSignOut} title="Sign out" />,
            headerLeft: () => (
              <IconButton icon="account-plus-outline" size={25} onPress={() => navigation.navigate("AddFriend")} />
            ),
          }}
        />
        <Stack.Screen name="Messages" component={Messages} options={({ route }) => ({ title: route.params.name })} />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="AddFriend" component={AddFriend} />
      </Stack.Group>
    </Stack.Navigator>
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
