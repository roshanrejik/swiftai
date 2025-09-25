import { StyleSheet } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { Colors } from "../../constants/Colors";
import { FONTS } from "@/src/constants/Fonts";

export const styles = StyleSheet.create({
  Container: {
    width: "100%",
    height: verticalScale(45),
    borderWidth: 1,
    borderRadius: moderateScale(8),
    flexDirection: "row",
    backgroundColor:Colors.inputBackground,
    alignItems: "center",
    paddingHorizontal: moderateScale(10),
    marginBottom: verticalScale(22),
  },
  leftIconL:{
    color:"red"
  },
  errorText:{
    color: Colors.red,
    position:"absolute",
    bottom:verticalScale(5),
    fontFamily:FONTS.regular,
    fontSize: moderateScale(12),
    marginTop: verticalScale(5),
    paddingHorizontal:verticalScale(5)
  },
  Input: {
    flex: 1,
    height: "100%",
    color: Colors.placeHolder,
    fontFamily:FONTS.medium,
    fontSize: moderateScale(20),
    
  },
  label: {
    fontSize: moderateScale(16),
    fontFamily:FONTS.medium,
    color: Colors.placeHolder,
    paddingLeft: moderateScale(5),
  },
  labelGray:{
    fontFamily:FONTS.regular,
    color: Colors.placeHolder,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: moderateScale(10),
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: moderateScale(10),
  },
}); 