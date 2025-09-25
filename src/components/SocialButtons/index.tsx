import Images from "@/src/assets/Images";
import { FONTS } from "@/src/constants/Fonts";
import React from "react";
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { Colors } from "../../constants/Colors";
import { Theme } from "../../constants/Theme";

interface SocialButtonsProps {
  onApplePress?: () => void;
  onGooglePress?: () => void;
}

const SocialButtons: React.FC<SocialButtonsProps> = ({
  onApplePress = () => { },
  onGooglePress = () => { },
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.socialButton}
        onPress={onGooglePress}
        activeOpacity={0.8}
      >
        <Image
          resizeMode="contain"
          source={Images.google}
          style={styles.socialIcon}
        />
        <Text style={styles.buttonText}>Sign In with Google </Text>
      </TouchableOpacity>

      {
        Platform.OS === "ios" && (
          <TouchableOpacity
            style={styles.socialButton}
            onPress={onApplePress}
            activeOpacity={0.8}
          >
            <Image source={Images.apple} style={styles.socialIcon} />
            <Text style={styles.buttonText}>Sign In with Apple</Text>
          </TouchableOpacity>
        )
      }

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    alignSelf: "center",
    justifyContent: "space-between",
    gap: Theme.spacing.md,
    marginTop: verticalScale(10),
  },
  socialIcon: {
    width: moderateScale(26),
    height: verticalScale(26),
  },
  button: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "center",
    padding: verticalScale(Theme.spacing.sm),
    borderRadius: Theme.borderRadius.md,
    height: verticalScale(45),
    gap: Theme.spacing.sm,
  },
  socialButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: verticalScale(Theme.spacing.sm),
    borderRadius: Theme.borderRadius.md,
    gap: Theme.spacing.sm,
    backgroundColor: Colors.inputBackground,
    paddingLeft: moderateScale(15),
    paddingVertical: verticalScale(10),
    borderColor: Colors.gray,
  },
  buttonText: {
    width: "70%",
    fontSize: moderateScale(16),
    color: Colors.placeHolder,
    fontFamily: FONTS.medium,
  },
});

export default SocialButtons;
