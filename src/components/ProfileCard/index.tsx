import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Icon from "@/src/assets/Icons";
import { scale } from "react-native-size-matters";
import { Colors } from "@/src/constants/Colors";
import styles from "./styles";
import { router } from "expo-router";
import useAuthStore from "@/src/store/auth/authStore";
import { Toast } from "toastify-react-native";
import Images from "@/src/assets/Images";
import CustomModal from "../CustomModal";

const options = [
  {
    title: "Edit Profile",
    icon: Images.edit,
    fontFamily: "FontAwesome5",
    screen: "editProfile",
  },
  {
    title: "Change Password",
    icon: Images.lock,
    fontFamily: "MaterialCommunityIcons",
    screen: "changePassword",
  },
  {
    title: "About",
    icon: Images.about,
    fontFamily: "SimpleLineIcons",
    screen: "userGuide",
  },
  // {
  //   title: "Chat History",
  //   icon: Images.about,
  //   fontFamily: "SimpleLineIcons",
  //   screen: "chatsHistory",
  // },
];

const ProfileCard = () => {
  const { logout, deleteAccount, isLoading, user } = useAuthStore();
  let [loader, setLoader] = useState(false)


  const [modalVisible, setModalVisible] = useState(false)
  const [modalContent, setModalContent] = useState({
    title: "Logout",
    content: "Are you sure you want to logout?"
  })
  const [actionType, setActionType] = useState<"logout" | "delete" | null>(null);
  let handleDelete = async () => {
    try {
      const response = await deleteAccount();

      if (response?.status === 200) {
        setModalVisible(false)
        setTimeout(() => {
          
          router.replace({
            pathname: "/(auth)/signin",
          });
          Toast.success(response?.message);
          setLoader(false)
        }, 400)
     

       
      }
    } catch (error) {
      console.log("Error deleting account:", error);
    }
  }

  let handleLogout = async () => {
    try {
      const response = await logout();

      if (response?.status === 200) {
       
        setModalVisible(false)
        setTimeout(() => {
          router.replace({
            pathname: "/(auth)/signin",
          });
          Toast.success(response?.message);
          setLoader(false)
        }, 400)
      }
    } catch (error) { }
  };

  const openModal = (forLogout) => {
    if (forLogout) {
      setModalContent({
        title: "Logout",
        content: "Are you sure you want to logout?"
      })
      setActionType("logout");
    } else {
      setModalContent({
        title: "Delete Account",
        content: "Are you sure you want to delete your account?"
      })
      setActionType("delete");
    }
    setModalVisible(true)
  }

  const handleConfirm = () => {
    setLoader(true)
    if (actionType === "logout") {
      handleLogout();
    } else if (actionType === "delete") {
      handleDelete();
    }
  
  };

  const about = [
    {
      title: "Help Center",
      icon: Images.help,
      fontFamily: "MaterialCommunityIcons",
      screen: "userGuide",
      onPress: () => { },

    },
    {
      title: "Privacy Policy",
      icon: Images.privacy,
      fontFamily: "MaterialCommunityIcons",
      screen: "editProfile",
      onPress: () => router.push({
        pathname: "/(mainstack)/privacypolicy",
      }),
    },
  ];


  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        {options.map((option, index) => {
          if(user?.isSocial && option.screen === "changePassword"){
            return null
          }else{
            return (
              <>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => router.push(`/(mainstack)/${option.screen}`)}
                  key={index}
                  style={[
                    styles.card,
                    // index !== options.length - 1 && styles.cardLine,
                  ]}
                >
                  <Image source={option.icon} style={styles.icon} />
                  <Text style={styles.title}>{option.title}</Text>
                  <MaterialIcons
                    name="arrow-forward-ios"
                    size={20}
                    color={Colors.grayText}
                  />
                </TouchableOpacity>
                <View style={index !== options.length - 1 && styles.cardLine} />
              </>
            )
          }
         
        })}
      </View>
      <View style={styles.cardContainer}>
        {about.map((option, index) => (
          <>
            <TouchableOpacity
              onPress={option.onPress}
              key={index}
              style={styles.card}
              activeOpacity={0.8}
            >
              <Image source={option.icon} style={styles.icon} />

              <Text style={styles.title}>{option.title}</Text>

              <Icon
                name={"arrow-forward-ios"}
                family="MaterialIcons"
                color={Colors.grayText}
                size={20}
              />
            </TouchableOpacity>
            <View style={index !== about.length - 1 && styles.cardLine} />
          </>
        ))}
      </View>

      <View style={styles.cardContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => openModal(true)} style={styles.card}>
          <Image source={Images.logout} style={styles.icon} />
          <Text style={styles.title}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => openModal(false)} style={styles.card}>
          <Image source={Images.logout} style={styles.icon} />
          <Text style={styles.title}>Delete Account</Text>
        </TouchableOpacity>
      </View>


      <CustomModal
        loader={loader}
        setLoader={setLoader}
        title={modalContent.title}
        message={modalContent.content}
        onConfirm={handleConfirm}
        visible={modalVisible} onClose={() => setModalVisible(false)} />
    </View>
  );
};

export default ProfileCard;
