import React, { useEffect } from "react";
import { View, Text, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./styles";
import { router, useNavigation } from "expo-router";
import { useConverstationStore } from "@/src/store/chat";
import { useAppStore } from "@/src/store/auth/appstore";
import useAuthStore from "@/src/store/auth/authStore";

const Splash = () => {
  const { firstTimeUser, _hasHydrated } = useAppStore();
  const { user, token, _hasAuthStoreHydrated } = useAuthStore();

  useEffect(() => {
    if (!_hasHydrated || !_hasAuthStoreHydrated) return; // wait until rehydrated

    const timeout = setTimeout(() => {
      if (firstTimeUser) {
        router.replace("/(auth)/onBoarding");
      } else if (user && token) {
        router.replace("/(mainstack)");
      } else {
        router.replace("/(auth)/signin");
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [_hasHydrated, _hasAuthStoreHydrated, firstTimeUser, user, token]);

  return (
    <LinearGradient
      colors={["#000000", "#5A5A5A"]}
      style={styles.container}
      start={{ x: 0.1, y: 0.4 }}
      end={{ x: 1, y: 0 }}
    >
      <View style={styles.content}>
        <Image
          source={require("../../assets/img/Logo.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
    </LinearGradient>
  );
};


export default Splash;
