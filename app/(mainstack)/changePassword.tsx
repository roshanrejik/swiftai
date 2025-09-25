import Icon from "@/src/assets/Icons";
import CustomButton from "@/src/components/Button";
import HomeHeader from "@/src/components/HomeHeader";
import Input from "@/src/components/Input";
import ValidationSchema from "@/src/config/validation";
import { Colors } from "@/src/constants/Colors";
import useAuthStore from "@/src/store/auth/authStore";
import { ImageMetadata } from "@/src/types";
import { router } from "expo-router";
import { Formik } from "formik";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { Toast } from "toastify-react-native";

type FormValues = {
  oldPassword: string;
  newPassword: string;
  reEnterPassword: string;
};
const initialValues: FormValues = {
  oldPassword: "",
  newPassword: "",
  reEnterPassword: "",
};

export default function ChangePassword() {
  //   const [proifleImage, setProfileImage] = useState<ImageMetadata>();
  const { changePassword, isLoading, token } = useAuthStore();
  const [showOldPassword, setShowOldPassword] = useState(true);
  const [showNewPassword, setShowNewPassword] = useState(true);
  const [showNewConfirmPassword, setShowNewConfirmPassword] = useState(true);



const rightIcon = () => {
    return (
      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.settingsContainer}
      >
        <Icon
          family="AntDesign"
          name="left"
          size={18}
          color={Colors.placeHolder}
        />
      </TouchableOpacity>
    );
  };

  const handleUpdate = async (values: FormValues) => {
    // console.log("Values", values);

    try {
      const response = await changePassword(
        values?.oldPassword,
        values?.newPassword
      );
      if (response?.status === 200) {
        Toast.success(response?.message || "Password changed successfully!");
        router.back();
      } else {

        Toast.error(
          response?.data.message || "Unable to change password. Please try again."
        );
      }
    } catch (error) {
    }
  };
  return (
    <ScrollView
    style={styles.container}>
      <HomeHeader heading="Change Password" rightIcon={rightIcon()} />
      <Formik
        // key={savedUser?.email}
        initialValues={initialValues}
        validationSchema={ValidationSchema.changePasswordValidation}
        onSubmit={(values, { setSubmitting }) => {
          // console.log("Value", values)
          handleUpdate(values);
          setSubmitting(false);
        }}
      >
        {({ handleChange, handleSubmit, values, errors }) => {
          return (
            <View style={styles.inputContainer}>
              <Input
                labelColor
                error={errors?.oldPassword || ""}
                label="Old Password:"
                placeholder="Enter your Old Password"
                InputProps={{
                  value: values?.oldPassword,
                  secureTextEntry: showOldPassword,
                  autoCapitalize: "none",
                }}
                IconPress={() => {
                  setShowOldPassword(!showOldPassword);
                }}
                LableStyle={styles.labelStyle}
                onChangeText={handleChange("oldPassword")}
                allowFloat={false}
                SectionStyle={styles.sectionStyle}
                InputStyle={styles.inputStyle}
                rightIcon={{
                  Family: "Font-Awsome",
                  name: !showOldPassword ? "eye" : "eye-slash",
                  size: 20,
                }}
                leftIcon={{
                  Family: "AntDesign",
                  name: "lock",
                }}
              />
              <Input
                labelColor
                error={errors?.newPassword || ""}
                label="New Password:"
                placeholder="Enter your New Password"
                InputProps={{
                  value: values?.newPassword,
                  secureTextEntry: showNewPassword,
                  autoCapitalize: "none",
                }}
                IconPress={() => {
                  setShowNewPassword(!showNewPassword);
                }}
                LableStyle={styles.labelStyle}
                onChangeText={handleChange("newPassword")}
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
                }}
              />
              <Input
                labelColor
                error={errors?.reEnterPassword || ""}
                label="Confirm Password:"
                placeholder="Enter your Confirm Password"
                InputProps={{
                  value: values?.reEnterPassword,
                  secureTextEntry: showNewConfirmPassword,
                  autoCapitalize: "none",
                }}
                IconPress={() => {
                  setShowNewConfirmPassword(!showNewConfirmPassword);
                }}
                LableStyle={styles.labelStyle}
                onChangeText={handleChange("reEnterPassword")}
                allowFloat={false}
                SectionStyle={styles.sectionStyle}
                InputStyle={styles.inputStyle}
                rightIcon={{
                  Family: "FontAwesome",
                  name: showNewConfirmPassword ? "eye-slash" : "eye",
                  size: 20,
                }}
                leftIcon={{
                  Family: "AntDesign",
                  name: "lock",
                }}
              />
              <CustomButton
                loading={isLoading}
                disabled={isLoading}
                text="Update"
                style={{ marginTop: verticalScale(20) }}
                onPress={handleSubmit}
              />
            </View>
          );
        }}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  inputContainer: {
    marginTop: scale(30),
    paddingHorizontal: scale(15),
    backgroundColor: Colors.black,
    paddingVertical: verticalScale(20),
    width: "95%",
    alignSelf: "center",
    borderRadius: scale(12),
  },
  settingsContainer: {
    backgroundColor: Colors.inputBackground,
    padding: scale(10),
    borderRadius: scale(8),
  },
  labelStyle: {
    marginVertical: verticalScale(5),
    fontSize: scale(14),
  },
  inputStyle: {
    fontSize: scale(12),
    height: verticalScale(35),
    paddingLeft: scale(5),
  },
  sectionStyle: {
    paddingVertical: 0,
    paddingRight: scale(6),
  },
});
