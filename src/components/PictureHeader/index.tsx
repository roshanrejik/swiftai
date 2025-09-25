import Icon from "@/src/assets/Icons";
import { Colors } from "@/src/constants/Colors";
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle, Alert } from "react-native";
import { scale } from "react-native-size-matters";
import styles from "./styles";
import { Image } from "expo-image";
import { cameraPicker, galleryPicker } from "@/src/Utils/Utils";
import { Toast } from "toastify-react-native";


interface ProfilePictureProps {
  imageUrl: string;
  name?: string;
  email?: string;
  onPressEdit?: () => void;
  editable?: boolean;
  containerStyle: ViewStyle;
  onImageSelected?: (image: any) => void;
}

const PictureHeader: React.FC<ProfilePictureProps> = ({
  imageUrl,
  name,
  email,
  onPressEdit,
  editable,
  containerStyle,
  onImageSelected
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const showImagePickerOptions = () => {
    Alert.alert(
      "Select Image",
      "Choose an option to select your profile picture",
      [
        {
          text: "Camera",
          onPress: () => handleCameraPicker(),
        },
        {
          text: "Gallery",
          onPress: () => handleGalleryPicker(),
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );
  };

  const handleCameraPicker = async () => {
    try {
      setIsLoading(true);
      const result = await cameraPicker();
      if (result?.fileSize > 10 * 1024 * 1024) {
        Toast.error('Picture cannot be more than 5MB');
        return;
      }
      if (result) {
        onImageSelected?.(result);
      }
      setIsLoading(true);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleGalleryPicker = async () => {
    try {
      setIsLoading(true);
      const result = await galleryPicker();
      if (result?.fileSize > 10 * 1024 * 1024) {
        Toast.error('Picture cannot be more than 5MB');
        return;
      }
      if (result) {
        onImageSelected?.(result);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handlePress = () => {
    if (editable) {
      showImagePickerOptions();
    } else {
      onPressEdit?.();
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={{ height: scale(100), width: scale(100), borderRadius: 100, borderWidth: 1, borderColor: Colors.placeHolder }}>
        {imageUrl ? (
          <Image 
          cachePolicy="disk"
            source={imageUrl} 
            style={styles.image} 
            
          />
        ) : (
          <View style={styles.placeholderContainer}>
            <Icon
              size={40}
              name="user"
              family="FontAwesome"
              color={Colors.placeHolder}
            />
          </View>
        )}
        {editable && (
          <TouchableOpacity 
            onPress={handlePress} 
            style={styles.iconContainer}
            disabled={isLoading}
          >
            <Icon
              size={17}
              name={isLoading ? "loader" : "edit"}
              family="Feather"
              color={Colors.white}
            />
          </TouchableOpacity>
        )}
      </View>
      {!editable && <View style={styles.textContainer}>
        <Text style={styles.name}>{name || ""}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>}
    </View>
  );
};

export default PictureHeader;
