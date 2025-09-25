import Images from "@/src/assets/Images";
import AppLayout from "@/src/components/AppLayout";
import CustomButton from "@/src/components/Button";
import Header from "@/src/components/Header/index";
import Input from "@/src/components/Input";
import Layout from "@/src/components/Layout";
import ValidationSchema from "@/src/config/validation";
import { Colors } from "@/src/constants/Colors";
import { FONTS } from "@/src/constants/Fonts";
import useAuthStore from "@/src/store/auth/authStore";
import { router } from "expo-router";
import { Formik } from "formik";
import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { Toast } from "toastify-react-native";

type FormValues = {
  email: string;
};
const initialValues: FormValues = {
  email: "",
};
export default function ForgetPassword() {
  const { isLoading, resendOtp } = useAuthStore();

  const handleSendOTP = async (values: FormValues) => {
    try {
      const response = await resendOtp(values.email);

      if (response?.status === 200) {
        Toast.success(response?.message);
        router.push({
          pathname: "/(auth)/verifyOtp",
          params: { email: values.email, isForgotPassword: "true" },
        });
      }
    } catch (error) {
      Toast.error("Failed to resend OTP");
    }
  };

  return (
    <AppLayout hideLogo>
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subTitle}>
        A 4 digit code will be sent to your given email address
      </Text>
      <Formik
        // key={savedUser?.email}
        initialValues={{
          email: initialValues?.email || "",
        }}
        validationSchema={ValidationSchema.forgetPasswordValidation}
        onSubmit={(values, { setSubmitting }) => {
          handleSendOTP(values);
          setSubmitting(false);
        }}
      >
        {({ handleChange, handleSubmit, values, errors }) => {
          return (
            <View style={styles.container}>
              <Input
                label="Email"
                error={errors?.email || ""}
                placeholder="Enter Email"
                SectionStyle={styles.sectionStyle}
                InputProps={{
                  value: values?.email,
                  keyboardType: "email-address",
                  autoCapitalize: "none",
                }}
                LableStyle={styles.labelStyle}
                onChangeText={handleChange("email")}
                allowFloat={false}
                InputStyle={styles.inputStyle}
                leftIcon={{
                  Family: "Font-Awsome",
                  name: "envelope-o",
                  size: 20,
                }}
              />

              <CustomButton
                text="Next"
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
  title: {
    fontSize: moderateScale(32),
    fontFamily:FONTS.bold,
    color: Colors.white,
    marginTop: verticalScale(20),
    alignSelf: "center",
  },
  logo: {
    width: scale(100),
    height: scale(100),
    alignSelf: "center",
    marginTop: verticalScale(30),
  },
  subTitle: {
    fontSize: moderateScale(16),
    color: Colors.placeHolder,
    marginTop: verticalScale(10),
    alignSelf: "center",
    marginBottom: verticalScale(20),
    width: "70%",
    textAlign: "center",
  },
  forgetPasswordText: {
    fontSize: moderateScale(14),
    marginVertical: verticalScale(10),
    alignSelf: "center",
  },
  labelStyle: {
    marginVertical: verticalScale(5),
    fontSize: moderateScale(14),
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
});
