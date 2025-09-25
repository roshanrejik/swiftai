import { Colors } from "@/src/constants/Colors";
import { FONTS } from "@/src/constants/Fonts";
import { Platform, StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";

const styles = StyleSheet.create({
  container: {
    padding: scale(16),
    marginTop: "5%",
  },
  cardContainer: {
    backgroundColor: Colors.inputBackground,
    borderRadius: 12,
    marginBottom: scale(20),
    paddingVertical:scale(5),
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: scale(10),
    paddingVertical:scale(4),
  },
  cardLine:{
    width:"80%",
    alignSelf:"flex-end",
    borderBottomWidth:0.3,
    borderColor: Colors.placeHolder,
    // bottom:10
  },
  icon: {
    // marginRight: 16,
    width: scale(30),
    height: scale(30),
  },
  title: {
    flex: 1,
    fontSize: scale(16),
    paddingLeft: scale(20),
    fontFamily: FONTS.medium,
    color: Colors.white,
  },

  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  generalText: {
    color: Colors.white,
    fontSize: scale(12),
    fontWeight: "500",
  },
  lineView: {
    height: 1,
    width: "80%",
    backgroundColor: Colors.subText,
    marginVertical: scale(10),
  },
});

export default styles;
