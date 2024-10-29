import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router"; // If using Expo Router

export default function HomePage() {
  const router = useRouter(); // Initialize the router

  const navigateToTabs = () => {
    router.push("/(tabs)"); // Navigate to the /(tabs) route
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Index</Text>
      <Button title="Go to Tabs" onPress={navigateToTabs} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
});
