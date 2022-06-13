import React, { useState, useEffect } from "react";
import { DefaultTheme, Provider as PaperProvider, IconButton, Title, Headline, TextInput } from "react-native-paper";
import { StyleSheet, Text, View, Button } from "react-native";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#6ACC01",
    accent: "yellow",
    surface: "#FF0000",
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <View style={styles.titleWrapper}>
        <Title>Native Chat</Title>
      </View>
      <View style={styles.container}></View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleWrapper: {
    flex: 1,
    alignItems: "center",
    marginTop: 30,
  },
});
