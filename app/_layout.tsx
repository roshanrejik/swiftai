import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { Screens } from "@/src/constants/Screens";

import ToastManager from "toastify-react-native";
import { Colors } from "@/src/constants/Colors";
import GlobalLoaderProvider from "@/src/components/GlobalLoader/GlobalLoaderProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { EventRegister } from "react-native-event-listeners";
import { Events } from "@/src/constants/Constant";
import { router } from "expo-router";
import useAuthStore from "@/src/store/auth/authStore";

export default function RootLayout() {
  useEffect(() => {
    // Listen for unauthorized events
    const unsubscribe = EventRegister.addEventListener(Events.UNAUTHORIZED, () => {
      console.log("UNAUTHORIZED event received - redirecting to login");
      
      // Clear auth state
      useAuthStore.getState().logout();
      
      // Redirect to login screen
      router.replace("/(auth)");
    });

    return () => {
      // unsubscribe?.remove();
    };
  }, []);

  return (
    <GestureHandlerRootView style={{flex:1}} >
      <BottomSheetModalProvider>
        <GlobalLoaderProvider>
          <ToastManager
            width={350}
            position="top"
            positionValue={50}
            duration={2000}
            showCloseIcon={false}
            showProgressBar={false}
            textStyle={{
              color: Colors.black,
              fontSize: 15,
            }}
          />
          <Stack  screenOptions={{headerShown:false}}>
            <Stack.Screen name={Screens.AuthNavigation} />
            <Stack.Screen name="(mainstack)" />
          </Stack>
        </GlobalLoaderProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
