import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { icons } from "../../assets/icon";
import { Colors } from "@/src/constants/Colors";
import { styles } from "./styles";

const TabBar = ({ state, descriptors, navigation }: any) => {
  const primaryColor = Colors.primary;
  const greyColor = Colors.darkGreyText;

  return (
    <View style={styles.tabbar}>
      {state?.routes?.map(
        (
          route: { key: string; name: keyof typeof icons; params?: object },
          index: number
        ) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          if (
            ["_sitemap", "+not-found"].includes(route?.name) ||
            route?.name.includes("/styles")
          )
            return null;
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={route.name}
              style={styles.tabbarItem}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
            >
              {icons[route.name]({
                color: isFocused ? primaryColor : greyColor,
              })}
              <Text
                style={{
                  color: isFocused ? primaryColor : greyColor,
                  fontSize: 11,
                }}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        }
      )}
    </View>
  );
};

export default TabBar;
