import Icon from "@/src/assets/Icons";
import CustomButton from "@/src/components/Button";
import HomeHeader from "@/src/components/HomeHeader";
import Input from "@/src/components/Input";
import { getConversations } from "@/src/config/service";
import ValidationSchema from "@/src/config/validation";
import { Colors } from "@/src/constants/Colors";
import useAuthStore from "@/src/store/auth/authStore";
import { useConverstationStore } from "@/src/store/chat";
import { ImageMetadata } from "@/src/types";
import { parseDate } from "@/src/Utils/Utils";
import { router, useRouter } from "expo-router";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View, Text, ActivityIndicator } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { Toast } from "toastify-react-native";



export default function ChatsHistory() {
  const router = useRouter() as ReturnType<typeof useRouter>;
  const { items: convesationsList } = useConverstationStore();
  let [loader, setLoader] = useState(false);


  const handle_conversations = async () => {
    setLoader(true);
    await getConversations();
    setLoader(false);
  }

  useEffect(() => {
    handle_conversations()
  }, []);



  const rightIcon = () => {
    return (
      <TouchableOpacity
        onPress={() => router.back()}
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

  return (
    <View
      style={styles.container}>
      <HomeHeader heading="Chat history" rightIcon={rightIcon()} />
      <ScrollView>
      <View style={styles.chatList}>
        {
          loader &&
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>


        }

        {
          convesationsList.length === 0 &&
          <View style={styles.noChatsContainer}>
            <Text style={styles.noChatsText}>No history found</Text>
          </View>
        }
        
       {convesationsList.map((item) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.replace({ pathname: "/(mainstack)", params: { title: item.title, conversationId: item.id } })}
            key={item.id}
            style={styles.chatItem}
          >
            <Icon
              family="MaterialIcons"
              name="chat"
              size={20}
              color={Colors.placeHolder}
              style={{ marginRight: scale(10) }}
            />
            <View style={{ width: "90%", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <View style={{ width: "80%" }}>
                <Text style={styles.chatTitle}>{
                  item.title.length > 150 ? item.title.slice(0,150) + "..." : item.title
                  }</Text>
              </View>
              <View style={{ width: "22%" }}>
                <Text style={styles.chatDate}>{parseDate(item?.createdAt).toLocaleDateString()}</Text>
              </View>
            </View>


          </TouchableOpacity>
        ))} 
      </View>
      </ScrollView>
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  inputContainer: {
    marginTop: scale(30),
    paddingHorizontal: scale(15),
    backgroundColor: Colors.black,
    paddingVertical: verticalScale(20),
    width: "95%",
    alignSelf: "center",
    borderRadius: scale(12),
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
  noChatsText:{
    fontSize: scale(18),
    color: Colors.placeHolder,
  },
  inputStyle: {
    fontSize: scale(12),
    height: verticalScale(35),
    paddingLeft: scale(5),
  },
  noChatsContainer:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionStyle: {
    paddingVertical: 0,
    paddingRight: scale(6),
  },
  chatList: {
    padding: scale(15),
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: verticalScale(18),
    borderBottomWidth: 1,
    borderBottomColor: Colors.inputBackground,
    // height: verticalScale(70),
  },
  chatTitle: {
    color: Colors.white,
    fontSize: scale(14),
    fontWeight: "500",
  },
  chatDate: {
    color: Colors.placeHolder,
    fontSize: scale(10),
    marginTop: 2,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});