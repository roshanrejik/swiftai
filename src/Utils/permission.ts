import { Alert, Linking, Platform } from "react-native";

const cameraImagePermmission = () => {
  Alert.alert(
    "Permission Denied",
    "Media library access is required. Please enable it from settings.",
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Go to Settings",
        onPress: () => {
          if (Platform.OS === "ios") {
            Linking.openURL("app-settings:");
          } else {
            Linking.openSettings();
          }
        },
      },
    ]
  );
};

export { cameraImagePermmission };
