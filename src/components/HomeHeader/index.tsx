import { LinearGradient } from "expo-linear-gradient";
import React, { ReactNode } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";
import Images from "@/src/assets/Images";
import Icon from "@/src/assets/Icons";
import { Colors } from "@/src/constants/Colors";
import useAuthStore from "@/src/store/auth/authStore";
import { getGreeting } from "@/src/Utils/Utils";
import { scale } from "react-native-size-matters";

interface HomeHeaderProps {
  leftIcon?: React.JSX.Element;
  rightIcon?: React.JSX.Element;
  extraIcon?: React.JSX.Element;
  heading?: string;
  image?: boolean;
  largeHeader?: boolean;
  home?: boolean;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({
  largeHeader,
  heading,
  rightIcon,
  leftIcon,
  image,
  extraIcon,
  home,
}) => {
  const user = useAuthStore((state) => state.user);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.headerContainer}>
        <View style={styles.topRow}>
          {rightIcon ? rightIcon : <View />}
        </View>
        <View style={styles.center}>
          {home ? (
            <View style={styles.textContainer}>
              <Text style={styles.textHeading}>{getGreeting()}</Text>
              {/* <Image source={Images.logo} style={styles.image} /> */}
              <Text style={styles.textName}>{user?.fullName}</Text>
            </View>
          ) : (
            <>
              <View style={styles.textContainer}>
                <Text  style={[styles.textHeading,{
                  fontSize:scale(20)
                }]}>{heading}</Text>
              </View>
              <View />
            </>
          )}
        </View>
        <View style={styles.bottomRow}>
          {extraIcon ? extraIcon : null}
          {leftIcon ? leftIcon : <View />}
        </View>
      </View>
    </SafeAreaView>
  );
};
export default HomeHeader;
