import Icon from "@/src/assets/Icons";
import AppLayout from "@/src/components/AppLayout";
import CustomButton from "@/src/components/Button";
import Input from "@/src/components/Input";
import SocialButtons from "@/src/components/SocialButtons";
import ValidationSchema from "@/src/config/validation";
import { Colors } from "@/src/constants/Colors";
import { Events } from "@/src/constants/Constant";
import { FONTS } from "@/src/constants/Fonts";
import useAuthStore from "@/src/store/auth/authStore";
import { router, useNavigation } from "expo-router";
import { Formik } from "formik";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { Toast } from "toastify-react-native";
type FormValues = {
  emailOrUsername: string;
  password: string;
};
const initialValues: FormValues = {
  emailOrUsername: "",
  password: "",
};
export default function WelcomeScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const navigation = useNavigation();

  const { login, isLoading, resendOtp } = useAuthStore();

  const handleSendOtp = async (email: string) => {
    try {
      const response = await resendOtp(email);
      if (response?.status === 200) {
        Toast.success(response?.message);
        router.push({
          pathname: "/(auth)/verifyOtp",
          params: { email: email },
        });
      }
    } catch (error) {
      Toast.error("Failed to resend OTP");
    }
  };

  const handleSignIn = async (values: FormValues) => {
    try {
      const response = await login(values?.emailOrUsername, values?.password);
      if (response?.status === 200) {
        Toast.success("Login successfully!");
        router.dismissTo("/(mainstack)");
      } else {
        // Toast.error("Login failed. Please try again.");
      }
      if (response?.data?.userStatus === Events.UNVERIFIED) {
        handleSendOtp(values?.emailOrUsername);
      }
    } catch (error) {}
  };

  const handleAppleLogin = () => {
    Toast.info("Development in progress");
  };

  const handleGoogleLogin = () => {
    Toast.info("Development in progress");
  };

  const handleContinue = () => {
    router.push("/(auth)/signin");
  };
  return (
    <AppLayout scrollEnable={false} hideLogo>
      <View style={styles.mainContainer}>
        <Text style={styles.heading}>Swift</Text>
        <Text style={styles.desc}>Interval Coach</Text>
        <Text style={styles.subTitle}>
          Our App and AI empowers coaches to create tailored workouts that align
          with their training philosophies, improving performance and race
          times.
        </Text>
        <CustomButton
          style={{ width: "70%", alignSelf: "center", }}
          onPress={handleContinue}
          text="Let`s Get Started !"
        />
      </View>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  line: {
    width: "30%",
    marginHorizontal: scale(10),
    height: 1,
    alignSelf: "center",
    backgroundColor: Colors.white,
    marginVertical: verticalScale(10),
  },
  mainContainer: {
     flex: 1, 
     justifyContent: "center" },
  orText: {
    alignSelf: "center",
    color: Colors.white,
    fontFamily: FONTS.regular,
    fontSize: moderateScale(12),
  },
  orContainer: {
    marginTop: verticalScale(20),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  heading: {
    fontSize: moderateScale(120),
    fontFamily: FONTS.bold,
    fontWeight: "bold",
    color: Colors.white,
    alignSelf: "center",
  },
  desc: {
    fontSize: moderateScale(48),
    fontFamily: FONTS.bold,
    fontWeight: "bold",
    color: Colors.darkPrimary,
    alignSelf: "center",
  },
  subTitle: {
    fontSize: moderateScale(13),
    fontFamily: FONTS.regular,
    lineHeight: 25,
    paddingHorizontal: scale(20),
    color: Colors.white,
    marginTop: verticalScale(10),
    textAlign: "center",
    marginBottom: verticalScale(20),
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: verticalScale(20),
  },
  rememberContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  remmeberIcon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: scale(5),
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: verticalScale(20),
  },
  signupText: {
    color: Colors.white,
    fontFamily: FONTS.regular,
    fontSize: moderateScale(14),
  },
  labelStyle: {
    marginVertical: verticalScale(5),
    fontFamily: FONTS.regular,
    fontSize: moderateScale(14),
  },
  forgetPasswordText: {
    fontSize: moderateScale(14),
    color: Colors.primary,
    textAlign: "right",
  },
  inputStyle: {
    fontSize: moderateScale(11),
    height: verticalScale(35),
    paddingLeft: scale(5),
  },
  sectionStyle: {
    paddingVertical: 0,
    paddingRight: scale(6),
  },
  logo: {
    width: scale(100),
    height: scale(100),
    alignSelf: "center",
    marginTop: verticalScale(10),
  },
});
