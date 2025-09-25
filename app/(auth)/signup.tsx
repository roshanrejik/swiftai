"use client"

import CustomButton from "@/src/components/Button"
import Input from "@/src/components/Input"
import { Colors } from "@/src/constants/Colors"
import { router, useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { moderateScale, scale, verticalScale } from "react-native-size-matters"
import { Toast } from "toastify-react-native"
import { Formik } from "formik"
import ValidationSchema from "@/src/config/validation"
import AppLayout from "@/src/components/AppLayout"
import { DateIcon } from "@/src/components/DatePicker"
import useAuthStore from "@/src/store/auth/authStore"
import { FONTS } from "@/src/constants/Fonts"
import PictureHeader from "@/src/components/PictureHeader"
import Icon from "@/src/assets/Icons"



type FormValues = {
  email: string
  password: string
  confirmPassword: string
  fullName: string
  phoneNo: string
  dateOfBirth: string
}
const initialValues: FormValues = {
  email: "",
  password: "",
  confirmPassword: "",
  fullName: "",
  phoneNo: "",
  dateOfBirth: "",
}
export default function SignUp() {
  const [showPass, setShowPass] = useState(true)
  const [showPass2, setShowPass2] = useState(true)
  const [profileImage, setProfileImage] = useState("")
  const [acceptedTerms, setAcceptedTerms] = useState(false)

  const { register, isLoading} = useAuthStore()

  const handleImageSelected = (image: any) => {
    setProfileImage(image)
  }

const handleSignup = async (values: FormValues) => {
 
  if(!acceptedTerms){
    Toast.error("Please accept the terms and conditions")
    return
  }
  try {
    // Convert "" → null for optional fields
    const payload = {
      ...values,
      phoneNo: values.phoneNo.trim() === "" ? "" : values.phoneNo,
      dateOfBirth: values.dateOfBirth.trim() === "" ? "" : values.dateOfBirth,
    }

    let res:any = await register(payload, profileImage || "")
    
    if(res?.status === 200){
    Toast.success("Registration successful")
    router.push({
        pathname: "/(auth)/verifyOtp",
        params: { email: values?.email },
      })
    }
    
  } catch (error: any) {
    Toast.error(error?.message || "Registration failed")
  }
}

  return (
    <AppLayout hideLogo>
      <Text style={styles.title}>Create Your Account</Text>
      <Text style={styles.subTitle}>Please Provide your details to proceed</Text>

      <PictureHeader
        containerStyle={{
          top: scale(0),
        }}
        editable={true}
        imageUrl={profileImage}
        onImageSelected={handleImageSelected}
      />

      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={ValidationSchema.signupValidation}
        onSubmit={(values, { setSubmitting }) => {
          handleSignup(values)
          setSubmitting(false)
        }}
      >
        {({ handleChange, handleSubmit, values, errors, setFieldValue }) => (
          <View style={styles.container}>
            <Input
              error={errors?.fullName}
              label="Username"
              required={true}
              placeholder="Enter Username"
              SectionStyle={styles.sectionStyle}
              InputProps={{
                value: values?.fullName,
                autoCapitalize: "none",
              }}
              LableStyle={styles.labelStyle}
              onChangeText={(text) => setFieldValue("fullName", text)}
              allowFloat={false}
              InputStyle={styles.inputStyle}
              leftIcon={{
                Family: "FontAwesome",
                name: "user-o",
                size: 20,
              }}
            />
            <Input
              error={errors?.email}
              label="Email"
              required={true}
              placeholder="Enter Email"
              SectionStyle={styles.sectionStyle}
              InputProps={{
                value: values?.email,
                keyboardType: "email-address",
                autoCapitalize: "none",
              }}
              LableStyle={styles.labelStyle}
              onChangeText={(text) => setFieldValue("email", text)}
              allowFloat={false}
              InputStyle={styles.inputStyle}
              leftIcon={{
                Family: "SimpleLineIcons",
                name: "envelope",
                size: 20,
              }}
            />

            <Input
              error={errors?.phoneNo}
              label="Phone Number"
              keyboardType="phone-pad"
              placeholder="Enter your Phone Number"
              SectionStyle={styles.sectionStyle}
              InputProps={{
                value: values?.phoneNo,
                autoCapitalize: "none",
              }}
              LableStyle={styles.labelStyle}
              onChangeText={(text) => setFieldValue("phoneNo", text)}
              allowFloat={false}
              InputStyle={styles.inputStyle}
              leftIcon={{
                Family: "MaterialCommunityIcons",
                name: "phone",
                size: 20,
              }}
              required={false}
            />
            <DateIcon
              error={errors.dateOfBirth}
              value={values?.dateOfBirth}
              onDateChange={(date) => setFieldValue("dateOfBirth", date)}
              required={false}
            />
            <Input
            required={true}
              error={errors?.password}
              label="Password"
              placeholder="Enter Password"
              InputProps={{
                value: values?.password,
                secureTextEntry: showPass,
                autoCapitalize: "none",
              }}
              IconPress={() => {
                setShowPass(!showPass)
              }}
              LableStyle={styles.labelStyle}
              onChangeText={(text) => setFieldValue("password", text)}
              allowFloat={false}
              SectionStyle={styles.sectionStyle}
              InputStyle={styles.inputStyle}
              rightIcon={{
                Family: "Font-Awsome",
                name: showPass ? "eye-slash" : "eye",
                size: 20,
                color: Colors.placeHolder,
              }}
              leftIcon={{
                Family: "AntDesign",
                name: "lock",
                size: 20,
              }}
            />

            <Input
             required={true}
              error={errors?.confirmPassword}
              label="Confirm Password"
              placeholder="Enter Password"
              InputProps={{
                value: values?.confirmPassword,
                secureTextEntry: showPass2,
                autoCapitalize: "none",
              }}
              IconPress={() => {
                setShowPass2(!showPass2)
              }}
              LableStyle={styles.labelStyle}
              onChangeText={(text) => setFieldValue("confirmPassword", text)}
              allowFloat={false}
              SectionStyle={styles.sectionStyle}
              InputStyle={styles.inputStyle}
              rightIcon={{
                Family: "Font-Awsome",
                name: showPass2 ? "eye-slash" : "eye",
                size: 20,
                color: Colors.placeHolder,
              }}
              leftIcon={{
                Family: "AntDesign",
                name: "lock",
                size: 20,
              }}
            />

            <View style={styles.termsContainer}>
              <View
                style={styles.checkboxContainer}
              >
                <TouchableOpacity 
                hitSlop={20}
                onPress={() => setAcceptedTerms(!acceptedTerms)}
                activeOpacity={0.8}
                style={[styles.checkbox, acceptedTerms && styles.checkboxChecked]}>
                  {acceptedTerms && (
                   <Icon family="Font-Awsome" name="check" size={14} color={Colors.white} />
                  )}
                </TouchableOpacity>
                <Text style={styles.termsText}>
                  I agree to the{" "}
                  <Text style={styles.termsLink}>Terms and Conditions</Text>
                  <Text style={[styles.termsLink,{
                    color:'white',
                    textDecorationLine: "none",
                  }]}> & </Text>
                  <Text 
                  onPress={() => router.push("/(mainstack)/privacypolicy")}
                  style={styles.termsLink}>Privacy Policy</Text>

                </Text>
              </View>
            </View>

            <CustomButton
              text="Sign Up"
              style={{ marginTop: verticalScale(20) }}
              loading={isLoading}
              onPress={() => handleSubmit()}
            />
          </View>
        )}
      </Formik>
      <View style={styles.bottomContainer}>
        <Text style={styles.signupText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => router.push("/(auth)/signin")}>
          <Text style={[styles.signupText, { fontFamily: FONTS.bold, color: Colors.primary }]}> Sign In</Text>
        </TouchableOpacity>
      </View>
      
    </AppLayout>
  )
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
    color: Colors.placeHolder,
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
    fontSize: moderateScale(12),
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
  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(15),
    marginBottom: verticalScale(20),
    paddingRight:verticalScale(20),
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.placeHolder,
    justifyContent: "center",
    alignItems: "center",
    marginRight: scale(8),
  },
  checkboxChecked: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  checkmark: {
    color: Colors.white,
    fontSize: moderateScale(16),
  },
  termsText: {
    fontSize: moderateScale(14),
    color: Colors.placeHolder,
  },
  termsLink: {
    color: Colors.primary,
    textDecorationLine: "underline",
  },
})
