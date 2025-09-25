import { StyleSheet, Platform } from "react-native";
import { Colors } from "@/src/constants/Colors";
import { scale } from "react-native-size-matters";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  input: {
    width: scale(55),
    height: scale(55),
    borderColor: Colors.primary,
    borderRadius: 8,
    textAlign: "center",
    fontSize: 20,
    color: Colors.placeHolder,
    backgroundColor: Colors.inputBackground,
    ...Platform.select({
      ios: {
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
});
