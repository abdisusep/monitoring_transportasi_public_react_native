import React from "react";
import { SafeAreaView } from "react-native";
import AppBottomNavigator from "./navigation/AppBottomNavigator";

export default function App() {
  return (
  <SafeAreaView style={{ flex: 1 }}>
      <AppBottomNavigator/>
  </SafeAreaView>
  );
}