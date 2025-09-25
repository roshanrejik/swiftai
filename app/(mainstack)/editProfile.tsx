"use client";

import { View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import type { ImageMetadata } from "@/src/types";
import HomeHeader from "@/src/components/HomeHeader";
import { scale, verticalScale } from "react-native-size-matters";
import { Colors } from "@/src/constants/Colors";
import Icon from "@/src/assets/Icons";
import { router, useLocalSearchParams } from "expo-router";
import PictureHeader from "@/src/components/PictureHeader";
import Images from "@/src/assets/Images";
import CustomButton from "@/src/components/Button";
import { DateIcon } from "@/src/components/DatePicker";
import Input from "@/src/components/Input";
import useAuthStore from "@/src/store/auth/authStore";
import { Toast } from "toastify-react-native";

export default function EditProfile() {
  const user = useAuthStore((state) => state.user);
  const { editProfile } = useAuthStore();
  const { isLoading } = useAuthStore();

  const params = useLocalSearchParams();

  // Initialize state with proper values
  const [email, setEmail] = useState(user?.email || "");
  const [name, setName] = useState(user?.fullName || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNo || "");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [profilePicture, setProfilePicture] = useState(
    user?.profileImage || ""
  );

  // Store original values to compare changes
  const [originalValues, setOriginalValues] = useState({
    email: "",
    fullName: "",
    phoneNo: "",
    dateOfBirth: "",
    profileImage: ""
  });

  // Convert backend date to YYYY-MM-DD format for consistent handling
  const convertToBackendFormat = (dateString: string): string => {
    if (!dateString) return "";

    // If it's already in YYYY-MM-DD format, return as is
    if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return dateString;
    }

    // If it's ISO format, convert to YYYY-MM-DD
    if (dateString.includes("T") || dateString.includes("Z")) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    }

    return dateString;
  };

  // Update state when user data changes
  useEffect(() => {
    if (user) {
      const formattedDate = convertToBackendFormat(user.dateOfBirth || "");
      
      setEmail(user.email || "");
      setName(user.fullName || "");
      setPhoneNumber(user.phoneNo || "");
      setDateOfBirth(formattedDate);
      setProfilePicture(user.profileImage || "");

      // Store original values for comparison
      setOriginalValues({
        email: user.email || "",
        fullName: user.fullName || "",
        phoneNo: user.phoneNo || "",
        dateOfBirth: formattedDate,
        profileImage: user.profileImage || ""
      });
    }
  }, [user]);

  useEffect(() => {
    if (params.updatePicture) {
      setProfilePicture(params.updatePicture as string);
    }
  }, [params]);

  const rightIcon = () => {
    return (
      <TouchableOpacity
        onPress={() =>
          // router.replace({
          //   pathname: "/(mainstack)/profile",
          // })
          router.back()
        }
        style={styles.settingsContainer}
      >
        <Icon
          family="AntDesign"
          name="left"
          size={18}
          color={Colors.placeHolder}
        />
      </TouchableOpacity>
    );
  };

  const onPressEdit = () => {
    // This will now be handled by the PictureHeader component directly
    // No need to navigate to selectAvatar screen
  };

  const handleDateChange = (backendDate: string) => {
    setDateOfBirth(backendDate);
  };

  const handleImageSelected = (imageUri: string) => {
    setProfilePicture(imageUri)
  }

  // Check if any changes have been made
  const hasChanges = () => {
    return (
      email !== originalValues.email ||
      name !== originalValues.fullName ||
      phoneNumber !== originalValues.phoneNo ||
      dateOfBirth !== originalValues.dateOfBirth ||
      profilePicture !== originalValues.profileImage
    );
  };

  const handleUpdate = async () => {

    const updateData = {
      email: email,
      fullName: name,
      phoneNo: phoneNumber,
      dateOfBirth: dateOfBirth,
      profileImage: profilePicture,
    };

    try {
      const response = await editProfile(updateData);

    
      // Update the auth store with new data if needed
      // useAuthStore.getState().setUser({ ...user, ...updateData });
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <HomeHeader largeHeader heading="Edit Profile" rightIcon={rightIcon()} />
      <PictureHeader
        onPressEdit={onPressEdit}
        editable={true}
        imageUrl={profilePicture}
        onImageSelected={handleImageSelected}
        containerStyle={{}}
      />

      <View style={styles.inputContainer}>
        <Input
          labelColor
          label="Username"
          placeholder="Enter Username"
          SectionStyle={styles.sectionStyle}
          InputProps={{
            value: name,
            autoCapitalize: "none",
          }}
          LableStyle={styles.labelStyle}
          onChangeText={(name) => setName(name)}
          allowFloat={false}
          InputStyle={styles.inputStyle}
          leftIcon={{
            Family: "FontAwesome",
            name: "user-o",
          }}
          required={false}
        />

        <Input
          labelColor
          label="Email"
          editable={false}
          placeholder="Enter Email"
          SectionStyle={styles.sectionStyle}
          InputProps={{
            value: email,
            keyboardType: "email-address",
            autoCapitalize: "none",
          }}
          LableStyle={styles.labelStyle}
          onChangeText={(email) => setEmail(email)}
          allowFloat={false}
          InputStyle={styles.inputStyle}
          leftIcon={{
            Family: "Font-Awsome",
            name: "envelope-o",
            size: 20,
          }}
          required={false}
        />

        <Input
          labelColor
          label="Phone Number"
          placeholder="Enter your Phone Number"
          SectionStyle={styles.sectionStyle}
          InputProps={{
            value: phoneNumber,
            keyboardType: "phone-pad",
            autoCapitalize: "none",
          }}
          LableStyle={styles.labelStyle}
          onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
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
          onDateChange={handleDateChange}
          value={dateOfBirth}
          labelColor={true}
          required={false}
        />

        <CustomButton
          disabled={isLoading || !hasChanges()}
          loading={isLoading}
          text="Update"
          style={{ marginTop: verticalScale(20) }}
          onPress={handleUpdate}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  inputContainer: {
    marginTop: scale(30),
    paddingHorizontal: scale(20),
  },
  settingsContainer: {
    backgroundColor: Colors.inputBackground,
    padding: scale(10),
    borderRadius: scale(8),
  },
  labelStyle: {
    marginVertical: verticalScale(5),
    fontSize: scale(14),
  },
  inputStyle: {
    fontSize: scale(13),
    height: verticalScale(35),
    paddingLeft: scale(5),
  },
  sectionStyle: {
    paddingVertical: 0,
    paddingRight: scale(6),
  },
});
