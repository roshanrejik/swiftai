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
import { googleSignin } from "@/src/store/thirdParty/googleLogin";
import { router, useNavigation } from "expo-router";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { Toast } from "toastify-react-native";
import * as AppleAuthentication from "expo-apple-authentication";
import { useConverstationStore } from "@/src/store/chat";
import { useAppStore } from "@/src/store/auth/appstore";

type FormValues = {
  emailOrUsername: string;
  password: string;
};
const initialValues: FormValues = {
  emailOrUsername: "",
  password: "",
};
export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const navigation = useNavigation();
  const { updateFirstTimeUser } = useAppStore();
  const { login, isLoading, resendOtp, socialLogin } = useAuthStore();

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

  useEffect(() => {
    updateFirstTimeUser(false);
  }, []);

  const handleSignIn = async (values: FormValues) => {
    try {
      const response = await login(values?.emailOrUsername, values?.password);
      if (response?.status === 200) {
        Toast.success("Login successfully!");
        router.replace("/(mainstack)");
      } else {
        // Toast.error("Login failed. Please try again.");
      }
      if (response?.data?.userStatus === Events.UNVERIFIED) {
        handleSendOtp(values?.emailOrUsername);
      }
    } catch (error) { }
  };

  async function handleAppleLogin() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      const { user, email, fullName, identityToken } = credential;

      if (!identityToken) {
        Toast.error("Apple Sign-In failed: No token returned");
        return;
      }

      const body = {
        socialId: user,
        platform: Platform.OS,
        email: email ?? "",
        fullName:
          fullName?.givenName || fullName?.familyName
            ? `${fullName?.givenName ?? ""} ${fullName?.familyName ?? ""}`.trim()
            : "Apple User",
        socialToken: identityToken,
        fcmToken: null,
        socialPlatform: "apple",
      };

      console.log("🍎 Apple login body:", body);
      await socialLogin(body);

      Toast.success("Login successful!");
      router.replace("/(mainstack)");
    } catch (error: any) {
      if (error.code === "ERR_CANCELED") {
        Toast.error("Apple login cancelled");
      } else {
        console.error("Apple login error:", error);
        Toast.error("Apple login failed. Check your Apple setup.");
      }
    }
  }



  const handleGoogleLogin = async () => {
    try {
      const response = await googleSignin();

      if (!response?.data?.user) {
        Toast.error("Failed to get user data from Google");
        return;
      }

      const body = {
        socialId: response.data.user.id,
        platform: Platform.OS === "ios" ? "ios" : "android",
        email: response.data.user.email,
        fullName: response.data.user.name,
        socialToken: response.data.idToken,
        fcmToken: null,
        socialPlatform: "google",
      };

      console.log("Google login body:", body);

      await socialLogin(body);

      Toast.success("Login successful!");
      router.replace("/(mainstack)");
    } catch (error: any) {
      console.error("Google login error:", error);
      Toast.error(error?.message || "Login failed. Please try again.");
    }
  };



  const redirectToForgetPassword = () => {
    router.push("/(auth)/forgetPassword");
  };
  return (
    <AppLayout scrollEnable={true} hideLogo>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subTitle}>Please Login to continue</Text>
      <Formik
        // key={savedUser?.email}
        initialValues={{
          emailOrUsername: initialValues?.emailOrUsername || "",
          password: initialValues?.password || "",
        }}
        validationSchema={ValidationSchema.loginValidation}
        onSubmit={(values, { setSubmitting }) => {
          handleSignIn(values);
          setSubmitting(false);
        }}
      >
        {({ handleChange, handleSubmit, values, errors }) => {
          return (
            <View style={styles.container}>
              <Input
                error={errors?.emailOrUsername}
                placeholder="Enter Email"
                label="Email"
                SectionStyle={styles.sectionStyle}
                InputProps={{
                  value: values?.emailOrUsername,
                  keyboardType: "email-address",
                  autoCapitalize: "none",
                }}
                LableStyle={styles.labelStyle}
                onChangeText={handleChange("emailOrUsername")}
                allowFloat={false}
                InputStyle={styles.inputStyle}
                leftIcon={{
                  Family: "SimpleLineIcons",
                  name: "envelope",
                }}
              />

              <Input
                error={errors?.password}
                label="Password"
                placeholder="Enter Password"
                InputProps={{
                  value: values?.password,
                  secureTextEntry: showPass,
                  autoCapitalize: "none",
                }}
                IconPress={() => {
                  setShowPass(!showPass);
                }}
                LableStyle={styles.labelStyle}
                onChangeText={handleChange("password")}
                allowFloat={false}
                SectionStyle={styles.sectionStyle}
                InputStyle={styles.inputStyle}
                leftIcon={{
                  Family: "AntDesign",
                  name: "lock",
                  size: 20,
                }}
                rightIcon={{
                  Family: "Font-Awsome",
                  name: showPass ? "eye-slash" : "eye",
                  size: 20,
                }}
              />
              <TouchableOpacity
                style={styles.rememberContainer}
                onPress={() => router.push("/(auth)/forgetPassword")}
              >
                <Text
                  onPress={redirectToForgetPassword}
                  style={styles.forgetPasswordText}
                >
                  Forgot Password?
                </Text>
              </TouchableOpacity>
              <CustomButton
                loading={isLoading}
                text="Sign In"
                style={{ marginTop: verticalScale(20) }}
                onPress={() => handleSubmit()}
              />
            </View>
          );
        }}
      </Formik>
      {/* <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>Or Sign In with</Text>
        <View style={styles.line} />
      </View> */}
      <SocialButtons
        onApplePress={handleAppleLogin}
        onGooglePress={handleGoogleLogin}
      />
      <Text style={styles.orText}>OR</Text>

      <View style={styles.bottomContainer}>
        <Text style={styles.signupText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
          <Text
            style={[
              styles.signupText,
              { fontFamily: FONTS.bold, color: Colors.primary },
            ]}
          >
            {" "}
            Sign up
          </Text>
        </TouchableOpacity>
      </View>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(15),
    backgroundColor: Colors.black,
    paddingVertical: verticalScale(20),
    width: "95%",
    alignSelf: "center",
    borderRadius: scale(12),
  },
  line: {
    width: "30%",
    marginHorizontal: scale(10),
    height: 1,
    alignSelf: "center",
    backgroundColor: Colors.white,
    marginVertical: verticalScale(10),
  },
  orText: {
    alignSelf: "center",
    color: Colors.placeHolder,
    fontFamily: FONTS.regular,
    fontSize: moderateScale(16),
    marginTop: verticalScale(20),
  },
  orContainer: {
    marginTop: verticalScale(10),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    fontSize: moderateScale(32),
    fontFamily: FONTS.bold,
    fontWeight: "bold",
    color: Colors.white,
    marginTop: verticalScale(20),
    alignSelf: "center",
  },
  subTitle: {
    fontSize: moderateScale(16),
    fontFamily: FONTS.regular,
    color: Colors.white,
    marginTop: verticalScale(10),
    alignSelf: "center",
    marginBottom: verticalScale(20),
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: verticalScale(20),
  },
  rememberContainer: {
    alignSelf: "center",
    paddingVertical: scale(5),
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
    marginTop: verticalScale(10),
  },
  signupText: {
    color: Colors.white,
    fontFamily: FONTS.regular,
    fontSize: moderateScale(16),
  },
  labelStyle: {
    marginVertical: verticalScale(5),
    fontFamily: FONTS.regular,
    fontSize: moderateScale(14),
  },
  forgetPasswordText: {
    fontFamily: FONTS.bold,
    fontSize: moderateScale(16),
    color: Colors.white,
    textAlign: "right",
  },
  inputStyle: {
    fontSize: moderateScale(13),
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
