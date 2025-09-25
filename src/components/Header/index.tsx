import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import Icon from "../../assets/Icons/index";
import { Colors } from "../../constants/Colors";

import { IconProps } from "../../types";

interface HeaderProps {
  title?: string;
  topHeight?: number;
  rightBtn?: boolean;
  otherRightBtn?: boolean;
  rightBtnHandler?: () => void;
  otherRightBtnHandler?: () => void;
  leftBtnHandler?: () => void;
  back?: boolean;
  backHandler?: () => void;
  rightIcon?: IconProps;
  otherRightIcon?: IconProps;
  leftIcon?: IconProps;
  children?: React.ReactNode;
  leftBtn?: boolean;
}

const Header = ({
  title,
  rightBtn,
  leftBtn,
  rightBtnHandler,
  rightIcon,
  otherRightIcon,
  otherRightBtn,
  otherRightBtnHandler,
  leftIcon,
  leftBtnHandler,
  children,
}: HeaderProps) => {
  return (
    <View style={{ height: verticalScale(65) }}>
      <View style={styles.header}>
        <>
          {leftBtn && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={leftBtnHandler}
              style={[
                styles.btnStyle,
                {
                  backgroundColor: Colors.white,
                  left: scale(10),
                },
              ]}
            >
              <Icon {...leftIcon} />
            </TouchableOpacity>
          )}

          <View>
            <Text style={styles.labelStyle}>{title}</Text>
          </View>
          {/* <View> */}
          {rightBtn && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={rightBtnHandler}
              style={[
                styles.btnStyle,
                {
                  backgroundColor: Colors.primary,
                  right: otherRightBtn ? scale(45) : scale(10),
                },
              ]}
            >
              <Icon {...rightIcon} />
            </TouchableOpacity>
          )}
          {otherRightBtn && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={otherRightBtnHandler}
              style={[
                styles.btnStyle,
                {
                  backgroundColor: Colors.darkGreyText,
                  right: scale(10),
                },
              ]}
            >
              <Icon {...otherRightIcon} />
            </TouchableOpacity>
          )}
        </>
      </View>
      {children}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  topContainer: { 
    height: verticalScale(130) 
  },
  header: {
    marginTop: verticalScale(30),
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  btnStyle: {
    position: "absolute",
    alignItems: "center",
    width: scale(32),
    height: verticalScale(32),
    justifyContent: "center",
    borderRadius: moderateScale(5),
  },
  img: { 
    width: "100%", 
    height: "100%" 
  },
  labelStyle: {
    color: Colors.black,
    fontSize: moderateScale(20),
    marginTop: scale(4),
  },
});
