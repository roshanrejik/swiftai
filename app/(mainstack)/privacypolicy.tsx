import Icon from "@/src/assets/Icons";
import HomeHeader from "@/src/components/HomeHeader";
import { Colors } from "@/src/constants/Colors";
import { privacyPolicyContent } from "@/src/constants/Constant";
import { FONTS } from "@/src/constants/Fonts";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

export default function PrivacyPolicy() {
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
    <View style={{ flex: 1, backgroundColor: Colors.black }}>
      <HomeHeader heading="Privacy Policy" rightIcon={rightIcon()} />
      {/* <ScrollView showsVerticalScrollIndicator={false} style={styles.container}> */}
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.inputBackground,
          borderTopLeftRadius: scale(20),
          borderTopRightRadius: scale(20),
          marginTop: scale(50),
          paddingBottom:scale(30),
          paddingTop:scale(20)
        }}
      >
        <ScrollView>
          {privacyPolicyContent.map((item) => {
            const { heading, content } = item;
            return (
              <View style={{paddingHorizontal:scale(12),}}>
                <Text style={{fontFamily:FONTS['bold'],fontSize:scale(16),color:'#C2C2C2',marginVertical:scale(10)}}>{heading}</Text>
                <Text style={{fontFamily:FONTS['regular'],color:Colors.placeHolder,lineHeight:scale(20)}}>{content}</Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
      {/* </ScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: Colors.white,
  },
  avatarContainer: {
    paddingHorizontal: scale(10),
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: Colors.inputBackground,
    marginRight: 10,
    marginVertical: scale(15),
    height: scale(100),
  },
  settingsContainer: {
    backgroundColor: Colors.inputBackground,
    padding: scale(10),
    borderRadius: scale(8),
  },
});
