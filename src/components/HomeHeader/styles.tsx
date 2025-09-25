import { Colors } from "@/src/constants/Colors";
import { FONTS } from "@/src/constants/Fonts";
import { StyleSheet } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

export const styles = StyleSheet.create({
  container: {
    borderBottomLeftRadius: scale(20),
    borderBottomRightRadius: scale(20),
    // paddingVertical: verticalScale(20),
  },
  safeAreaView: {
    backgroundColor: Colors.black,
  },
  topRow:{
    width:'15%',
    alignItems: "center",
    justifyContent:'center',
  },
  bottomRow:{
     alignItems: "center",
    justifyContent:'center',
    flexDirection:'row',
     width:'15%',
     paddingRight:scale(10),
  },
  center:{
   width:'70%',
   alignItems: "center",
   justifyContent:'center',
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.black,
    paddingHorizontal: scale(5),
    marginTop: verticalScale(5),
    marginBottom: verticalScale(10),
    height: verticalScale(50),

  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: scale(8),
    borderColor: Colors.primary,
    borderWidth: scale(1),
  },
  image: {
    height: scale(50),
    width: scale(50),
  },
  settingsContainer: {
    backgroundColor: Colors.white,
    padding: scale(10),
    borderRadius: scale(8),
  },
  textContainer: {
    paddingLeft:scale(10),
  },
  textHeading: {
    fontSize: scale(16),
    color: Colors.white,textAlign:"center",
    fontFamily: FONTS.bold,
  },
  textName: {
    fontSize: scale(12),
    color: Colors.placeHolder,
    fontFamily: FONTS.regular,
    textAlign:'center'
  },
  text: {
    color: Colors.white,
  },
});
