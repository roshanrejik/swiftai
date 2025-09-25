import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Fontisto from "@expo/vector-icons/Fontisto";
import Foundation from "@expo/vector-icons/Foundation";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Octicons from "@expo/vector-icons/Octicons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import Zocial from "@expo/vector-icons/Zocial";

import { Colors } from "../../constants/Colors";

interface IconProps {
  family?: string;
  name?: string;
  size?: number;
  color?: string;
}

const Icon: React.FC<IconProps> = ({
  family,
  name,
  size = 20,
  color = Colors.darkGreyText,
  ...props
}) => {
  let Family: any;

  switch (family) {
    case "AntDesign":
      Family = AntDesign;
      break;
    case "Entypo":
      Family = Entypo;
      break;
    case "EvilIcons":
      Family = EvilIcons;
      break;
    case "Feather":
      Family = Feather;
      break;
    case "FontAwesome":
      Family = FontAwesome;
      break;
    case "FontAwesome5":
      Family = FontAwesome5;
      break;
    case "FontAwesome6":
      Family = FontAwesome6;
      break;
    case "Fontisto":
      Family = Fontisto;
      break;
    case "Foundation":
      Family = Foundation;
      break;
    case "Ionicons":
      Family = Ionicons;
      break;
    case "MaterialCommunityIcons":
      Family = MaterialCommunityIcons;
      break;
    case "MaterialIcons":
      Family = MaterialIcons;
      break;
    case "Octicons":
      Family = Octicons;
      break;
    case "SimpleLineIcons":
      Family = SimpleLineIcons;
      break;
    case "Zocial":
      Family = Zocial;
      break;
    default:
      Family = FontAwesome;
  }

  return (
    <Family
      name={name ? name : "help-outline"}
      size={size}
      color={color}
      {...props}
    />
  );
};

export default Icon;
