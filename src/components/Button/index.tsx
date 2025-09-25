import React from "react";
import {
  ActivityIndicator,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Colors } from "../../constants/Colors";
import { styles } from "./styles";

interface ButtonProps {
  text?: string; // Optional text for the button
  Color?: "dark" | "light" | "theme" | "disable" | "red" | "green"; // Allowed color options
  style?: StyleProp<ViewStyle>; // Optional styles for the button
  onPress?: () => void; // Optional onPress function
  Left?: React.ReactNode; // Optional left content (any node)
  Right?: React.ReactNode; // Optional right content (any node)
  disabled?: boolean;
  loading?: boolean;
}

const CustomButton: React.FC<ButtonProps> = ({
  text = "",
  Color = "primary",
  style = {},
  onPress = () => {},
  Left = false,
  Right = false,
  disabled = false,
  loading = false,
}) => {
  const STYLE_COLOR: { [key: string]: { background: string; text: string } } = {
    dark: { background: Colors.black, text: Colors.white },
    light: { background: Colors.white, text: Colors.black },
    theme: { background: Colors.themeColor, text: Colors.black },
    disable: { background: Colors.gray, text: Colors.grayText },
    red: { background: Colors.red, text: Colors.white },
    primary: { background: Colors.primary, text: Colors.white },
    green: { background: Colors.ExtralightGreen, text: Colors.black },
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled || Color === "disable"}
      onPress={onPress}
      style={[
        styles.Container,
        { 
          backgroundColor: disabled ? 'lightgray' : Colors.primary,
          opacity: disabled ? 0.6 : 1
        },
        style,
      ]}
    >
      <View>
        {/* flex={0.2} alignItems={'center'} */}
        {Left ? Left : null}
      </View>
      <View>
        {/* flex={0.6} alignItems={'center'} */}
       {!loading? <Text style={[styles.Text, { color: disabled ? 'black' : STYLE_COLOR[Color].text }]}>
          {text}
        </Text>:
          <ActivityIndicator style={{ alignSelf: "center" }} color={Colors.white} />}
      </View>
      <View>
        {/* flex={0.2} alignItems={'center'} */}
        {Right ? Right : null}
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
