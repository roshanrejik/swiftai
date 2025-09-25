import { Colors } from "@/src/constants/Colors";
import { FONTS } from "@/src/constants/Fonts";
import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.inputBackground,
    flexDirection: "row",
    paddingHorizontal: scale(10),
    paddingVertical: scale(6),
    borderWidth: 1,
    borderColor: Colors.placeHolder,
    borderRadius: 9,
    width: scale(170),
    marginTop: scale(30),
  },
  image: {
    width: scale(25),
    height: scale(25),
    borderRadius: 25,
    marginRight: 10,
  },
  text: {
    fontSize: 15,
    lineHeight: 26,
    color: Colors.placeHolder,
    textAlign: "center",
    flex: 1,
    alignSelf: "center",
    fontFamily: FONTS.medium,
  },
});

export default styles;
