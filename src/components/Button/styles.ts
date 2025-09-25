import { StyleSheet } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import {FONTS} from "@/src/constants/Fonts";
export const styles = StyleSheet.create({
  Container: {
    width: "100%",
    height: verticalScale(45),
    borderRadius: moderateScale(15),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: verticalScale(15),
    flexDirection: "row",
  },
  Text: {
    fontSize: moderateScale(18),
    fontFamily:FONTS.medium,
    lineHeight: verticalScale(24),
  },
}); 