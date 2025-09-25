import Splash from "@/src/components/Splash";
import useAuthStore from "@/src/store/auth/authStore";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import { FONTS } from "@/src/constants/Fonts";
import { Toast } from "toastify-react-native";
import NetInfo from "@react-native-community/netinfo";


const index = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const token = useAuthStore((state) => state.token);
  const hasCompletedOnboarding = useAuthStore((state) => state.hasCompletedOnboarding);
  const validateToken = useAuthStore((state) => state.validateToken);

  const fadeAnim = useRef(new Animated.Value(1)).current;
  // const fadeOutAndNavigate = (screen: string) => {
  //   Animated.timing(fadeAnim, {
  //     toValue: 0,
  //     duration: 1000,
  //     useNativeDriver: true,
  //   }).start(() => {
  //     if (screen === "mainstack") {
  //       router.replace("/(mainstack)");
  //     } else if (screen === "onboarding") {
  //       router.replace("/(auth)/onBoarding");
  //     } else {
  //       router.replace("/(auth)");
  //     }
  //   });
  // };
  
  const [fontsLoaded] = useFonts({
    bold: require("../src/assets/fonts/Raleway-Bold.ttf"),
    regular: require("../src/assets/fonts/Raleway-Regular.ttf"),
    medium: require("../src/assets/fonts/Raleway-Medium.ttf"),
    light: require("../src/assets/fonts/Raleway-Thin.ttf"),
    black: require("../src/assets/fonts/Raleway-Black.ttf"),
  });

  // useEffect(() => {
  //   // Wait for Zustand to hydrate from AsyncStorage
  //   const unsubscribe = useAuthStore.persist.onFinishHydration(() => {
  //     setIsHydrated(true);
  //   });

  //   // If already hydrated, set immediately
  //   if (useAuthStore.persist.hasHydrated()) {
  //     setIsHydrated(true);
  //   }

  //   return unsubscribe;
  // }, []);


  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: any) => {
      if(state.isConnected){
      }else{
        Toast.show({
          type: "error",
          text1: "No internet connection",
          position: "top",
          visibilityTime: 5000,
        })
      } 
    });
    
 }, []);

  // useEffect(() => {
  //   if (isHydrated) {
  //     // Wait a bit for smooth transition
  //     setTimeout(async () => {
  //       if (token) {
  //         // Validate token with server before proceeding
  //         try {
  //           console.log("Token found, validating with server...");
  //           const isValid = await validateToken();
  //           if (isValid) {
  //             console.log("Token is valid, proceeding to mainStack");
  //             fadeOutAndNavigate("mainstack");
  //           } else {
  //             console.log("Token is invalid, going to auth");
  //             fadeOutAndNavigate("auth");
  //           }
  //         } catch (error) {
  //           console.log("Token validation failed, going to auth");
  //           fadeOutAndNavigate("auth");
  //         }
  //       } else {
  //         // No token - check if user has completed onboarding
  //         if (!hasCompletedOnboarding) {
  //           console.log("First time user, going to onboarding");
  //           fadeOutAndNavigate("onboarding");
  //         } else {
  //           console.log("Returning user without token, going to auth");
  //           fadeOutAndNavigate("auth");
  //         }
  //       }
  //     }, 1000);
  //   }
  // }, [isHydrated, fontsLoaded, token, hasCompletedOnboarding]);

  return <Splash />;
};

export default index;

const styles = StyleSheet.create({});
