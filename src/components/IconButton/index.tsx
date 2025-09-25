import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Icon from "../../assets/Icons/index";
import { scale } from "react-native-size-matters";
import { IconProps } from "../../types";
import { Colors } from "@/src/constants/Colors";

interface IconButtonProps {
  onPress?: () => void;
  borderRadius?: number;
  p?: number;
  icon?: IconProps;
  style?: any;
}

const ICON_BUTTON: React.FC<IconButtonProps> = ({
  onPress,
  borderRadius = 8,
  p = 1,
  icon,
  style,
}) => {
  return (
    <View style={[styles.Container, style]}>
      <Pressable onPress={onPress} style={{ padding: scale(p), borderRadius: scale(borderRadius) }}>
        <Icon color={Colors.placeHolder} {...icon} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    marginHorizontal: scale(4),
  },
});

export default ICON_BUTTON;
