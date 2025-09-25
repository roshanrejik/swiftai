// src/components/AnimatedStones.tsx

import React, { useEffect } from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import Images from "@/src/assets/Images";

const { width, height } = Dimensions.get("window");

const STONE_SIZE = 30;
const STONES_COUNT = 8;
const RADIUS = 120; // 👉 Increase this to spread out the stones
const CENTER_X = width / 2;
const CENTER_Y = height / 2 - 220; // 👉 Controls vertical shift

const stones = [
  Images.moving1,
  Images.moving2,
  Images.moving3,
  Images.moving4,
  Images.moving5,
  Images.moving6,
  Images.moving7,
  Images.moving8,
];

export default function AnimatedStones() {
  return stones.map((source, index) => (
    <Stone key={index} index={index} source={source} />
  ));
}

function Stone({ index, source }: { index: number; source: any }) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 8000 }), -1);
  }, []);

  const style = useAnimatedStyle(() => {
    const angle = (2 * Math.PI * (index + progress.value)) / STONES_COUNT;

    const x = RADIUS * Math.cos(angle);
    const y = RADIUS * Math.sin(angle);

    return {
      position: "absolute",
      left: CENTER_X + x - STONE_SIZE / 2,
      top: CENTER_Y + y - STONE_SIZE / 2,
      width: STONE_SIZE,
      height: STONE_SIZE,
      opacity: 0.9,
    };
  });

  return <Animated.Image source={source} style={[style, styles.stone]} />;
}

const styles = StyleSheet.create({
  stone: {
    resizeMode: "contain",
  },
});
