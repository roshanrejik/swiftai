import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/Colors";

interface ToastProps {
  text1?: string;
  text2?: string;
  [key: string]: any;
}

export const toastConfig = {
  success: ({ text1, text2, ...rest }: ToastProps) => (
    <View style={[styles.successContainer, { backgroundColor: Colors.green }]}>
      {/* <Icon {...{ size: 24, name: "check-circle", color: Colors.white }} /> */}
      <View style={styles.textContainer}>
        <Text style={{ color: Colors.white }}>{text1}</Text>
        <Text style={{ color: Colors.white }}>{text2}</Text>
      </View>
    </View>
  ),
  error: ({ text1, text2, ...rest }: ToastProps) => (
    <View style={[styles.errorContainer, { backgroundColor: Colors.red }]}>
      <View style={styles.textContainer}>
        <Text style={{ color: Colors.white }}>{text1}</Text>
        <Text style={{ color: Colors.white }}>{text2}</Text>
      </View>
    </View>
  ),
  info: ({ text1, text2, ...rest }: ToastProps) => (
    <View style={[styles.infoContainer, { backgroundColor: Colors.primary }]}>
      <View style={styles.textContainer}>
        <Text style={{ color: Colors.white }}>{text1}</Text>
        <Text style={{ color: Colors.white }}>{text2}</Text>
      </View>
    </View>
  ),
};

const styles = StyleSheet.create({
  successContainer: {
    height: 60,
    width: "100%",
    backgroundColor: Colors.green,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  errorContainer: {
    height: 60,
    width: "100%",
    backgroundColor: Colors.red,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  infoContainer: {
    height: 60,
    width: "100%",
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  textContainer: {
    marginLeft: 10,
  },
});
