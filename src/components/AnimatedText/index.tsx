import { Colors } from "@/src/constants/Colors";
import { FONTS } from "@/src/constants/Fonts";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import Markdown from "react-native-markdown-display";
import { scale } from "react-native-size-matters";

const customStyles = StyleSheet.create({
  body: {
    color:Colors.placeHolder,
    fontFamily:FONTS.unique,
    fontSize: scale(13), // Ad
    paddingRight:scale(8),
    paddingLeft:scale(3)

  },
  heading1: {
    color:Colors.placeHolder,
    fontFamily:FONTS.unique,
    fontSize: scale(13), // Adjust font size for H1 headings
  },
  paragraph: {
    color:Colors.placeHolder,

    fontFamily:FONTS.unique,
    fontSize: scale(13), // Ad
  },
  // Add more styles for other elements like list_item, strong, em, etc.
});

const AnimatedStreamText = ({
  text,
  user,
  onComplete, // 👈 new prop
}: {
  text: string;
  user: boolean;
  onComplete?: () => void;
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [displayText, setDisplayText] = React.useState("");
  // Handle both response formats: object with "answer" property or direct string
  const normalizedText = (() => {
    if (typeof text === "string") {
      return text;
    } else if (text && typeof text === "object" && text.answer) {
      return text.answer;
    } else {
      return text?.answer ?? "";
    }
  })();

  useEffect(() => {
    animatedValue.setValue(0);
    setDisplayText("");

    if (normalizedText && normalizedText.length > 0) {
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: normalizedText.length * 10, // Reduced from 30ms to 10ms per character (3x faster)
        useNativeDriver: false,
      }).start(({ finished }) => {
        if (finished) {
          onComplete?.(); // 👈 animation complete hone par call
        }
      });
    }
  }, [text, normalizedText]);

  useEffect(() => {
    const listenerId = animatedValue.addListener(({ value }) => {
      const length = Math.floor(normalizedText.length * value);
      setDisplayText(normalizedText.substring(0, length));
    });
    return () => {
      animatedValue.removeListener(listenerId);
    };
  }, [normalizedText]);

  return (
    <View style={{ width: "100%", paddingLeft: scale(10) }}>
      <Markdown style={customStyles}>{displayText}</Markdown>
    </View>
  );
};


export default AnimatedStreamText;

const styles = StyleSheet.create({
  assistantMessage: {
    alignSelf: "flex-start",
    backgroundColor: Colors.ReplyBg,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  userMessageText: {
    color: Colors.white,
  },
});
