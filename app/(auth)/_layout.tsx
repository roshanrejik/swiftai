import React from "react";
import { Stack } from "expo-router";
import { Screens } from "@/src/constants/Screens";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={Screens.Signin} />
      <Stack.Screen name={Screens.Signup} />
      <Stack.Screen name={Screens.Search} />
      <Stack.Screen name={Screens.ForgetPassword} />
      <Stack.Screen name={Screens.VerifyOtp} />
      <Stack.Screen name={Screens.ResetPassword} />
      <Stack.Screen name={Screens.Onboarding} />
      <Stack.Screen name={Screens.WelcomeScreen} />
      <Stack.Screen name= {Screens.ChatsHistory}/>
      <Stack.Screen name= {Screens.HistoryDetail}/>

    </Stack>
  );
}
