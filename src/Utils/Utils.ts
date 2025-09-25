import { cameraImagePermmission } from "@/src/Utils/permission";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";

const galleryPicker = async () => {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (permission.granted) {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    
    });

    return result?.assets[0];
  } else {
    cameraImagePermmission();
  }
};
const cameraPicker = async () => {
  const permission = await ImagePicker.requestCameraPermissionsAsync();
  console.log({ permission });

  if (permission.granted) {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
 
    });

    return result?.assets[0];
  } else {
    cameraImagePermmission();
  }
};

const MessageShow = (
  type: string = "success",
  title: string,
  message?: string
): void => {
  Toast.show({
    type,
    text1: title,
    text2: message,
  });
};
function getGreeting(): string {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return "Good Morning  ☀️";
  } else if (hour >= 12 && hour < 17) {
    return "Good Afternoon  🌤️";
  } else if (hour >= 17 && hour < 21) {
    return "Good Evening  🌇";
  } else {
    return "Good Night  🌙";
  }
}

// Utility functions for date handling

// Utility functions for date handling

export const parseDate = (dateString: string): Date => {
  if (!dateString) return new Date()

  // Check if it's ISO format (contains 'T' or 'Z')
  if (dateString.includes("T") || dateString.includes("Z")) {
    return new Date(dateString)
  }

  // Check if it's YYYY-MM-DD or DD-MM-YYYY format
  if (dateString.includes("-") && dateString.split("-").length === 3) {
    const parts = dateString.split("-")

    if (parts[0].length === 4) {
      // YYYY-MM-DD format
      const [year, month, day] = parts.map(Number)
      return new Date(year, month - 1, day)
    } else if (parts[0].length <= 2) {
      // DD-MM-YYYY format
      const [day, month, year] = parts.map(Number)
      return new Date(year, month - 1, day)
    }
  }

  // Fallback to current date
  return new Date()
}

export const formatDateForDisplay = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, "0")
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const year = date.getFullYear()
  return `${day}-${month}-${year}`
}

export const formatDateForBackend = (date: Date): string => {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const day = date.getDate().toString().padStart(2, "0")
  return `${year}-${month}-${day}`
}

export const convertIsoToBackendFormat = (isoString: string): string => {
  if (!isoString) return ""

  const date = new Date(isoString)
  return formatDateForBackend(date)
}

export const isValidDate = (dateString: string): boolean => {
  const date = parseDate(dateString)
  return date instanceof Date && !isNaN(date.getTime())
}



export { galleryPicker, cameraPicker, MessageShow ,getGreeting };
