import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import Layout from "@/src/components/Layout";
import Header from "@/src/components/Header/index";
import ImageSelector from "@/src/components/ImageSelector";
import { ImageMetadata } from "@/src/types";
import HomeHeader from "@/src/components/HomeHeader";
import { scale } from "react-native-size-matters";
import { Colors } from "@/src/constants/Colors";
import Icon from "@/src/assets/Icons";
import { router } from "expo-router";
import PictureHeader from "@/src/components/PictureHeader";
import Images from "@/src/assets/Images";
import ProfileCard from "@/src/components/ProfileCard";
import useAuthStore from "@/src/store/auth/authStore";

export default function Profile() {
  const [proifleImage, setProfileImage] = useState<ImageMetadata>();
  const user = useAuthStore(state=>state.user);

  const rightIcon = () => {
    return (
      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.settingsContainer}
      >
        <Icon
          family="AntDesign"
          name="left"
          size={15}
          color={Colors.placeHolder}
        />
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <HomeHeader
        largeHeader
        heading="Setting"
        rightIcon={rightIcon()}
      />
      <PictureHeader
        // editable={true}
        // onPressEdit={()=>router.push('/(mainstack)/editProfile')}
        name={user?.fullName}
        email={user?.email}
        imageUrl={user?.profileImage}
        
      />
      <ProfileCard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  settingsContainer: {
    backgroundColor: Colors.inputBackground,
    padding: scale(10),
    borderRadius: scale(8),
  },
});
