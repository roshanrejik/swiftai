import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import Layout from "@/src/components/Layout";
import Header from "@/src/components/Header/index";
// import styles from "./styles";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <Layout
      Header={
        <>
          <Header title={"Settings"} topHeight={65} />
        </>
      }
    >
      <View style={styles.container}>
        <Text>Settings</Text>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
