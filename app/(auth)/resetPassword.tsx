import CustomButton from "@/src/components/Button";
import Input from "@/src/components/Input";
import { Colors } from "@/src/constants/Colors";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { Toast } from "toastify-react-native";
import { Formik } from "formik";
import ValidationSchema from "@/src/config/validation";
import AppLayout from "@/src/components/AppLayout";
import useAuthStore from "@/src/store/auth/authStore";
import { FONTS } from "@/src/constants/Fonts";

type FormValues = {
  password: string;
  confirmPassword: string;
};
const initialValues: FormValues = {
  password: "",
  confirmPassword: "",
};
export default function ResetPassword() {
  const params = useLocalSearchParams();
  const { email } = params;
  const [showNewPassword, setShowNewPassword] = useState(true);
   const [showNewConfirmPassword, setShowNewConfirmPassword] = useState(true);

  const navigation = useNavigation();
  const { resetPassword, isLoading } = useAuthStore();

  const handleResetPassword = async (values: FormValues) => {
    try {
      const response = await resetPassword(values?.password, email as string);
      if (response?.status === 200) {
        Toast.success(response?.message || "Password changed successfully!");
        navigation.reset({
          index: 0,
          routes: [{ name: "(auth)" as never }],
        });
      } else {
        Toast.error(
          response?.data?.message || response.error.message || "Password reset failed. Please try again."
        );
      }
    } catch (error) {
     
    }
  };

  return (
    <AppLayout>
      <Text style={styles.title}>Create New Password</Text>
      <Text style={styles.subTitle}>
        Your new password must be different from a previously used password
      </Text>
      <Formik
        // key={savedUser?.email}
        initialValues={{
          password: initialValues?.password || "",
          confirmPassword: initialValues?.confirmPassword || "",
        }}
        validationSchema={ValidationSchema.resetPasswordValidation}
        onSubmit={(values, { setSubmitting }) => {
          handleResetPassword(values);
          setSubmitting(false);
        }}
      >
        {({ handleChange, handleSubmit, values, errors }) => {
          return (
            <View style={styles.container}>
              <Input
                error={errors?.password}
                label="Password"
                placeholder="Enter Your New Password"
                InputProps={{
                  value: values?.password,
                  secureTextEntry: showNewPassword,
                  autoCapitalize: "none",
                }}
                IconPress={() => {
                  setShowNewPassword(!showNewPassword);
                }}
                LableStyle={styles.labelStyle}
                onChangeText={handleChange("password")}
                allowFloat={false}
                SectionStyle={styles.sectionStyle}
                InputStyle={styles.inputStyle}
                rightIcon={{
                  Family: "Font-Awsome",
                  name: showNewPassword ? "eye-slash" : "eye",
                  size: 20,
                }}
                leftIcon={{
                  Family: "AntDesign",
                  name: "lock",
                  size: 20,
                }}
              />
              <Input
                error={errors?.confirmPassword}
                label="Confirm Password"
                placeholder="Enter Your Confirm Password"
                InputProps={{
                  value: values?.confirmPassword,
                  secureTextEntry: showNewConfirmPassword,
                  autoCapitalize: "none",
                }}
                IconPress={() => {
                  setShowNewConfirmPassword(!showNewConfirmPassword);
                }}
                LableStyle={styles.labelStyle}
                onChangeText={handleChange("confirmPassword")}
                allowFloat={false}
                SectionStyle={styles.sectionStyle}
                InputStyle={styles.inputStyle}
                rightIcon={{
                  Family: "Font-Awsome",
                  name: showNewConfirmPassword ? "eye-slash" : "eye",
                  size: 20,
                }}
                leftIcon={{
                  Family: "AntDesign",
                  name: "lock",
                  size: 20,
                }}
              />
              <CustomButton
                text="Submit"
                style={{ marginTop: verticalScale(20) }}
                onPress={() => handleSubmit()}
                loading={isLoading}
                disabled={isLoading}
              />
            </View>
          );
        }}
      </Formik>
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
    color: Colors.white,
    fontSize: moderateScale(12),
  },
  orContainer: {
    marginTop: verticalScale(20),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    fontSize: moderateScale(24),
    fontFamily: FONTS.bold,
    color: Colors.white,
    marginTop: verticalScale(20),
    alignSelf: "center",
  },
  subTitle: {
    fontSize: moderateScale(16),
    fontFamily: FONTS.regular,
    color: Colors.placeHolder,
    textAlign: "center",
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
    fontSize: moderateScale(14),
  },
  labelStyle: {
    marginVertical: verticalScale(5),
    fontSize: moderateScale(14),
  },
  forgetPasswordText: {
    fontSize: moderateScale(14),
    color: Colors.primary,
    textAlign: "right",
    marginTop: verticalScale(10),
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
