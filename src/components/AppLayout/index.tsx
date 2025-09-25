import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../../constants/Colors";
import { Theme } from "../../constants/Theme";
import Icon from "@/src/assets/Icons";
import { scale, verticalScale } from "react-native-size-matters";
import Images from "@/src/assets/Images";
import { router } from "expo-router";
import AnimatedStones from "../AnimationStones";

interface AppLayoutProps {
  children: React.ReactNode;
  style?: any;
  allowBack?: boolean;
  hideLogo?: boolean;
  scrollEnable?: boolean;
}

const AppLayout = ({
  children,
  allowBack,
  style,
  hideLogo,
  scrollEnable,
}: AppLayoutProps) => {
  const handleBackPress = () => {
    router.back();
  };

  return (
    <ImageBackground
      source={Images.background}
      style={[styles.container, style]}
    >
      <View style={{position:'absolute',backgroundColor:'red',top:10}}>

      <AnimatedStones /> 
      </View>


      {allowBack && (
        <TouchableOpacity
          onPress={handleBackPress}
          style={styles.arrowContainer}
        >
          <Icon
            family="MaterialCommunityIcons"
            name="keyboard-backspace"
            size={30}
            color={Colors.black}
          />
        </TouchableOpacity>
      )}

      <SafeAreaView style={styles.content}>
        <ScrollView
          scrollEnabled={scrollEnable}
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContainer}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  scrollContainer: {
    flexGrow: 1, // 🔑 makes ScrollView only scroll if content overflows
    // justifyContent: "center",
  },
  logo: {
    width: scale(100),
    height: scale(100),
    alignSelf: "center",
    marginTop: verticalScale(50),
  },
  arrowContainer: {
    zIndex: 1,
    width: scale(40),
    left: scale(20),
    top: scale(40),
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 8,
    paddingHorizontal: scale(10),
    paddingVertical: scale(10),
  },
  content: {
    flex: 1,
    padding: Theme.spacing.md,
  },
});

export default AppLayout;
