import AppLayout from "@/src/components/AppLayout";
import CustomButton from "@/src/components/Button";
import OTPInput from "@/src/components/OTPInput";
import { Colors } from "@/src/constants/Colors";
import { FONTS } from "@/src/constants/Fonts";
import useAuthStore from "@/src/store/auth/authStore";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  moderateScale,
  s,
  scale,
  verticalScale,
} from "react-native-size-matters";
import { Toast } from "toastify-react-native";

export default function VerifyOtp() {
  const [otpValue, setOtpValue] = useState("");
  const params = useLocalSearchParams();
  const { email, isForgotPassword } = params;
  const { verifyOtp, resendOtp, isLoading } = useAuthStore();
  const [otp, setOtp] = useState<string[]>(Array(4).fill(''));

  const [secondsLeft, setSecondsLeft] = useState(60);

  // to handle timer

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft]);

  const handleOtpChange = (otp: string) => {
    if (otp.length === 4) {
      setOtpValue(otp);
    }
  };
  const handleVerifyOtp = async () => {
    try {
      const response = await verifyOtp(email as string, otpValue);
      // console.log("RESSSS===>",response)
      if (response?.status === 200) {
        Toast.success(response?.message);
        if (isForgotPassword === "true") {
          router.push({
            pathname: "/(auth)/resetPassword",
            params: { email: email },
          });
        } else {
          router.dismissTo("/(auth)/signin");
        }
      }
    } catch (error) {}
    // Toast.success("OTP Verified Successfully");
    // router.replace("/(auth)/resetPassword");
  };

  const handleResendOtp = async () => {
    setOtp(Array(4).fill(''));
    try {
      const response = await resendOtp(email as string);
      if (response?.status === 200) {
        Toast.success(response?.message);
        setSecondsLeft(60); // Reset the timer
      }
    } catch (error) {
      Toast.error("Failed to resend OTP");
    }
  };

  return (
    <AppLayout>
      <Text style={styles.title}>Verification Code</Text>
      <Text style={styles.subTitle}>
        We just send you a verify code. Check your inbox to get them.
      </Text>
      <View style={styles.container}>
        <OTPInput
        otp={otp}
        setOtp={setOtp}
        onOTPChange={(otp) => handleOtpChange(otp)} />
        <CustomButton
          text="Next"
          loading={isLoading}
          style={{ marginTop: verticalScale(20) }}
          disabled={otpValue.length < 4}
          onPress={handleVerifyOtp}
        />
        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Didn't receive the code?{"  "}</Text>
          <TouchableOpacity
            onPress={handleResendOtp}
            disabled={secondsLeft > 0 || isLoading}
          >
            <Text
              style={[
                styles.resendText,
                {
                  fontWeight: "bold",
                  color: Colors.primary,
                },
              ]}
            >
              {secondsLeft >0 ? `Resend Code in` : "Resend Code"}
            </Text>
          </TouchableOpacity>
        </View>
        {secondsLeft > 0 && (
          <Text
            style={[
              styles.resendText,
              {
                fontFamily: FONTS.bold,
                color: Colors.primary,
                alignSelf: "center",
                marginTop: verticalScale(10),
              },
            ]}
          >
            {`00:${secondsLeft}s`}
          </Text>
        )}
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
  forgetPasswordText: {
    fontSize: moderateScale(14),
    marginVertical: verticalScale(20),
    alignSelf: "center",
  },
  resendContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: verticalScale(20),
  },
  resendText: {
    color: Colors.white,
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
  title: {
    fontSize: moderateScale(32),
    fontWeight: "bold",
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
    color: Colors.subText,
    marginTop: verticalScale(10),
    alignSelf: "center",
    marginBottom: verticalScale(20),
    width: "70%",
    textAlign: "center",
    fontFamily: FONTS.regular,
  },
  sectionStyle: {
    paddingVertical: 0,
    paddingRight: scale(6),
  },
});
