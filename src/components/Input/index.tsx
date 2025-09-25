import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { Colors } from "../../constants/Colors";
import ICON_BUTTON from "../IconButton";
import { styles } from "./styles";
import Icon from "@/src/assets/Icons";

interface InputProps {
  leftIcon?: any;
  rightIcon?: any;
  label?: string;
  placeholder?: string;
  LableStyle?: any;
  InputStyle?: any;
  SectionStyle?: any;
  InputProps?: any;
  IconPress?: () => void;
  style?: any;
  onChangeText?: (text: string) => void;
  rightSection?: any;
  placeholderTextColor?: string;
  onFocus?: () => void;
  imageStyle?: any;
  allowCloseOnDone?: boolean;
  onSubmitCall?: () => void;
  allowTintColor?: boolean;
  activeBorderColor?: string | boolean;
  noActiveBorderColor?: string | boolean;
  allowFloat?: boolean;
  leftSection?: any;
  error?: string;
  labelColor?: boolean;
  keyboardType?: string;
  editable?: boolean;
  required:boolean;
}

const Input: React.FC<InputProps> = ({
  leftIcon,
  rightIcon = false,
  label = "",
  error,
  placeholder = "",
  LableStyle = {},
  InputStyle = {},
  SectionStyle = {},
  InputProps = {},
  keyboardType,
  IconPress = () => {},
  style = { marginTop: 10 },
  onChangeText = () => {},
  rightSection = false,
  placeholderTextColor = Colors.grayText,
  onFocus = () => {},
  imageStyle = {},
  labelColor,
  allowCloseOnDone = true,
  onSubmitCall = () => {},
  allowTintColor = true,
  activeBorderColor = false,
  noActiveBorderColor = false,
  allowFloat = true,
  leftSection = false,
  editable= true,
  required=false
}) => {
  const [activeColor, setActiveColor] = useState(false);
  const moveText = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (InputProps?.value !== "") {
      moveTextTop();
    } else if (InputProps?.value === "") {
      moveTextBottom();
    }
  }, [InputProps?.value]);

  const onFocusHandler = () => {
    if (InputProps?.value !== "") {
      moveTextTop();
    }
  };

  const onBlurHandler = () => {
    if (InputProps?.value === "") {
      moveTextBottom();
    }
  };
  const moveTextTop = () => {
    Animated.timing(moveText, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const moveTextBottom = () => {
    Animated.timing(moveText, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const yVal = moveText.interpolate({
    inputRange: [0, 1],
    outputRange: [4, -20],
  });

  const animStyle = {
    transform: [
      {
        translateY: yVal,
      },
    ],
  };

  return (
    <>
      <View  >
        <View style={{flexDirection:'row'}}>
        <Text style={[styles.label, labelColor && styles.labelGray]}>
          {label}
        </Text>
        {
          required? <Text style={{color:Colors.red}}>*</Text>:null 
        }
        </View>
        <View style={[styles.Container, style]}>
          {leftSection && <View style={styles.leftSection}>{leftSection}</View>}
          {leftIcon && (
            <View style={styles.leftSection}>
              <Icon
                name={leftIcon.name}
                size={scale(20)}
                color={Colors.placeHolder}
                family={leftIcon.Family}
              />
            </View>
          )}
          <TextInput
          editable={editable}
          
            keyboardType={keyboardType|| "default"}
            style={[styles.Input, InputStyle]}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            onChangeText={onChangeText}
            onFocus={() => {
              setActiveColor(true);
              onFocus();
              onFocusHandler();
            }}
            secureTextEntry={
              !InputProps?.showPass ? InputProps?.secureTextEntry : false
            }
            onBlur={() => {
              setActiveColor(false);
              onBlurHandler();
            }}
            {...InputProps}
          />
          {rightSection && (
            <View style={styles.rightSection}>{rightSection}</View>
          )}
          {rightIcon && (
            <View style={styles.rightSection}>
              <ICON_BUTTON
                icon={rightIcon}
                onPress={IconPress}
                style={imageStyle}
              />
            </View>
          )}
          {allowFloat && (
            <Animated.Text
              style={[
                styles.label,
                LableStyle,
                {
                  transform: [
                    {
                      translateY: moveText.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -verticalScale(20)],
                      }),
                    },
                  ],
                },
              ]}
            >
              {label}
            </Animated.Text>
          )}
        </View>
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    </>
  );
};

export default Input;
