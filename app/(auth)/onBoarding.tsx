import Images from "@/src/assets/Images";
import { Colors } from "@/src/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { scale } from "react-native-size-matters";
import { FONTS } from "@/src/constants/Fonts";
import Icon from "@/src/assets/Icons";
import { Theme } from "@/src/constants/Theme";

const steps = [
  {
    image: Images.onboarding,
    title: "Effective training is key for runners",
    subtitle:
      "Swift /AI provides a practical solution for coaches and dedicated athletes. While traditional running books offer insights, they often lack actionable guidance.",
  },
  {
    image: Images.onboarding2,
    title: "Talk to AI-Your Ultimate Running Companion",
    subtitle:
      "Most track coaches understand running physiology but struggle to emphasize structured training. Runners need to balance intensity to avoid burnout and injury",
  },
];
const AnimatedImageBackground =
  Animated.createAnimatedComponent(ImageBackground);

const OnboardingScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true, // Add this for better performance
    }).start();
  }, [slideAnim]);

  const isAnimating = useRef(false);

  const onNext = (newStep: number) => {
    if (newStep >= steps.length) {
      onSkip();
      return;
    }
    setCurrentStep(newStep);
    flatListRef.current?.scrollToIndex({ index: newStep, animated: true });

    // if (isAnimating.current) return;
    // isAnimating.current = true;
    // Animated.timing(slideAnim, {
    //   toValue: -500,
    //   duration: 300,
    //   useNativeDriver: true,
    // }).start(() => {
    //   if (newStep == steps.length) {
    //     onSkip();
    //   } else {
    //     setCurrentStep(currentStep + 1);
    //     slideAnim.setValue(500);
    //     Animated.timing(slideAnim, {
    //       toValue: 0,
    //       duration: 300,
    //       useNativeDriver: true,
    //     }).start(() => {
    //       isAnimating.current = false;
    //     });
    //   }
    // });
  };

  const onSkip = () => {
    router.replace("/(auth)/welcomeScreen");
  };
  const onViewableItemsChanged = useCallback(
    ({
      viewableItems,
      changed,
    }: {
      viewableItems: Array<{ index: number }>;
      changed: any;
    }) => {
      if (viewableItems.length > 0) {
        // You can choose to get the index of the first visible item, or the one with highest viewability percentage
        setCurrentStep(viewableItems[0].index);
      }
    },
    []
  );

  return (
    <View style={styles.container}>
      <Text onPress={onSkip} style={styles.skipText}>
        Skip
      </Text>
      <FlatList
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50, // Adjust this threshold as needed
        }}
        keyExtractor={(_, index) => index.toString()}
        ref={flatListRef}
        data={steps}
        showsHorizontalScrollIndicator={false}
        horizontal
        scrollEnabled={true}
        pagingEnabled
        renderItem={({ item, index }) => {
          return (
            <View>
              <Image
                source={steps[index].image}
                style={[styles.imageBackground]}
                resizeMode="cover"
              />
            </View>
          );
        }}
      />
      <View style={styles.bottomPanel}>
        <View style={styles.paginationContainer}>
          {steps.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, currentStep === index && styles.activeDot]}
            />
          ))}
        </View>
        <Text style={styles.title}>{steps[currentStep || 0].title}</Text>
        <Text style={styles.subtitle}>{steps[currentStep || 0].subtitle}</Text>

        {/* <Text style={styles.subtitle}>
                    {steps[currentStep].subtitle}
                  </Text> */}

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.rightArrow}
            disabled={currentStep == 0}
            onPress={() => onNext(currentStep - 1)}
          >
            <Icon
              size={13}
              color={currentStep == 0 ? Colors.lightGrey : Colors.white}
              name="arrow-left-long"
              family="FontAwesome6"
            />
          </TouchableOpacity>
          <Text style={styles.separatorText}>|</Text>
          <TouchableOpacity
            style={styles.leftArrow}
            onPress={() => onNext(currentStep + 1)}
          >
            <Icon
              size={13}
              color={Colors.white}
              name="arrow-left-long"
              family="FontAwesome6"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const BOTTOM_PANEL_HEIGHT = scale(250);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black, // fallback color while image loads
  },
  separatorText: {
    color: Colors.white,
    fontSize: scale(20),
  },
  gradientContainer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    // opacity: 0.5,
    width: "100%",
  },
  imageBackground: {
    // flex: 1,
    justifyContent: "flex-end",
    width: Theme.screenSize.width,
    height: Theme.screenSize.height * 0.9,
    backgroundColor: Colors.black,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 100,
    },
  },
  bottomPanel: {
    height: BOTTOM_PANEL_HEIGHT,
    width: "100%",
    ...StyleSheet.absoluteFillObject,
    top: Theme.screenSize.height * 0.9 - BOTTOM_PANEL_HEIGHT,
    // backgroundColor: "rgba(0,0,0,0.7)",
    // borderTopLeftRadius: scale(100),
    // borderTopRightRadius: scale(100),
    borderWidth: scale(-100),
    position: "absolute",
    bottom: 0,
    opacity: 0.9,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: -100,
    },
    shadowRadius: 100,
    shadowOpacity: 0.5,
    backgroundColor: "black",
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    paddingHorizontal: 28,
    paddingTop: 20,
    paddingBottom: 36,
    justifyContent: "space-between",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: scale(10),
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 100,
    backgroundColor: Colors.grayText,
    marginHorizontal: 5,
  },
  activeDot: {
    width: 16,
    height: 16,
    backgroundColor: Colors.primary,
    bottom:2
  },
  title: {
    width: "100%",
    color: Colors.white,
    fontSize: scale(20),
    fontWeight: "bold",
    fontFamily: FONTS.bold,
    textAlign: "center",
    marginBottom: scale(10),
  },
  subtitle: {
    width: Theme.screenSize.width * 0.8,
    alignSelf: "center",
    color: Colors.subText,
    fontSize: scale(14),
    lineHeight: scale(25),
    fontFamily: FONTS.regular,
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: scale(120),
    alignSelf: "center",
    backgroundColor: "#232627",
    paddingVertical: scale(10),
    paddingHorizontal: scale(12),
    borderRadius: scale(10),
  },
  leftArrow: {
    padding: scale(8),
    transform: [{ rotateY: "180deg" }],
  },
  rightArrow: {
    padding: scale(8),
  },
  skipText: {
    color: Colors.white,
    fontSize: scale(16),
    alignSelf: "flex-end",
    fontFamily: FONTS.medium,
    marginTop: scale(30),
    paddingHorizontal: scale(20),
    paddingVertical: scale(10),
    position: "absolute",
    top: scale(20),
    zIndex: 100,
  },
  nextButton: {
    backgroundColor: Colors.primary,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: scale(22),
    paddingVertical: scale(12),
    borderRadius: scale(10),
  },
  nextText: {
    color: Colors.white,
    fontSize: scale(14),
    marginRight: 8,
    fontFamily: FONTS.medium,
  },
  nextArrow: {
    color: Colors.white,
    fontSize: scale(20),
    bottom: scale(3),
    fontFamily: FONTS.medium,
  },
  buttonText: {
    fontSize: scale(16),
    fontFamily: FONTS.medium,
  },
  name: {
    fontSize: scale(20),
    fontFamily: FONTS.bold,
    color: Colors.text,
    paddingTop: scale(5),
  },
});

export default OnboardingScreen;
