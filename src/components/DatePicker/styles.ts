import { Colors } from "@/src/constants/Colors";
import { FONTS } from "@/src/constants/Fonts";
import { Theme } from "@/src/constants/Theme";
import { StyleSheet } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.inputBackground,
    borderRadius: scale(8),
    paddingVertical: verticalScale(5),
    marginBottom: verticalScale(10),
    // height: verticalScale(42),
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Theme.spacing.md,
    padding: scale(8),
  },
  dateText: {
    color: Colors.placeHolder,
    fontSize: moderateScale(14),
    fontFamily: FONTS.regular,
  },
  datePlaceHolder: {
    color: Colors.placeHolder,
    fontSize: moderateScale(12),
    fontFamily: FONTS.regular,
    paddingLeft: moderateScale(5),
  },
  errorText: {
    color: Colors.red,
    fontFamily: FONTS.regular,
    fontSize: moderateScale(12),
    marginBottom: verticalScale(5),
    paddingHorizontal: verticalScale(5),
  },
  label: {
    fontSize: moderateScale(14),
    color: Colors.placeHolder,
    paddingLeft: moderateScale(5),
    paddingBottom: verticalScale(10),
  },
  labelGray: {
    fontSize: moderateScale(14),
    paddingLeft: moderateScale(5),
    paddingBottom: verticalScale(10),
    color: Colors.placeHolder,
  },
});
export default styles;
