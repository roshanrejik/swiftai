import { Colors } from "@/src/constants/Colors";
import { FONTS } from "@/src/constants/Fonts";
import { Platform, StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: scale(10),
    alignSelf: "center",
    top: scale(20),
  },
  iconContainer: {
    backgroundColor: Colors.grayText,
    width: scale(25),
    height: scale(25),
    borderRadius: 100,
    bottom: scale(-5),
    left: scale(70),
    zIndex: 100,
    position: "absolute",
    alignItems: "center",
    justifyContent:'center'
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius:100
  },
  placeholderContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    backgroundColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    alignItems: "center",
  },
  name: {
    fontSize: scale(20),
    fontFamily: FONTS.bold,
    color: Colors.white,
    paddingTop: scale(5),
  },
  email: {
    fontSize: scale(14),
    lineHeight: scale(20),
    color: Colors.grayText,
  },
});
export default styles;
