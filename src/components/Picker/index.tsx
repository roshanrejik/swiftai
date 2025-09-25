import React, { FC, ReactElement, useRef, useState } from "react";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  View,
  StyleProp,
  Image,
  ViewStyle,
  Text,
} from "react-native";

import { Colors } from "../../constants/Colors";
import { moderateScale, verticalScale, scale } from "react-native-size-matters";

interface Props {
  label: string;
  data: Array<{ label: string; value: string }>;
  onSelect: (item: { label: string; value: string }) => void;
  children?: React.ReactNode;
  dropDownStyle?: StyleProp<ViewStyle>;
  viewStyle?: StyleProp<ViewStyle>;
}

const Picker: FC<Props> = ({
  label,
  data,
  onSelect,
  children,
  dropDownStyle,
  viewStyle,
}) => {
  const DropdownButton = useRef<View>(null);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(undefined);
  const [dropdownTop, setDropdownTop] = useState(0);

  const toggleDropdown = (): void => {
    visible ? setVisible(false) : openDropdown();
  };

  const openDropdown = (): void => {
    if (DropdownButton.current) {
      DropdownButton.current.measure(
        (
          _fx: number,
          _fy: number,
          _w: number,
          h: number,
          _px: number,
          py: number
        ) => {
          setDropdownTop(py + h);
        }
      );
    }
    setVisible(true);
  };

  const onItemPress = (item: any): void => {
    setVisible(false);
    setSelected(item);
    onSelect(item);
  };

  const renderItem = ({ item }: any): ReactElement<any, any> => (
    <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
      {item.icon ? item.icon : null}
      <Text
        style={[
          {
            color: Colors.black,
            fontSize: moderateScale(15),
            padding: 4,
            // paddingLeft: 10,
            textAlign: "center",
          },
        ]}
      >
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  const renderDropdown = (): ReactElement<any, any> => {
    return (
      <Modal visible={visible} transparent animationType="none">
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setVisible(false)}
        >
          <View
            style={[
              styles.dropdown,
              styles.shadow,
              { bottom: 0 },
              dropDownStyle,
            ]}
          >
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={() => (
                <View
                  style={[
                    styles.line,
                    {
                      marginHorizontal: 5,
                    },
                  ]}
                />
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <TouchableOpacity
      ref={DropdownButton}
      style={[styles.button, viewStyle]}
      onPress={toggleDropdown}
    >
      {renderDropdown()}

      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    // flexDirection: "row",
    // alignItems: "center",
    // zIndex: 1,
    // alignSelf: "baseline",
  },
  dropdown: {
    position: "absolute",
    backgroundColor: Colors.white,
    borderRadius: moderateScale(10),
    paddingVertical: scale(4),
    width: "100%",
    height: verticalScale(140),
  },
  overlay: {
    width: "100%",
    height: "100%",
    top: 0,
    backgroundColor: Colors.backdrop,
  },
  item: {
    padding: scale(5),
    minWidth: scale(100),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  shadow: {
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: scale(5),
    },
    shadowOpacity: 0.5,
    shadowRadius: scale(10),
    elevation: 5,
  },
  line: {
    height: scale(0.5),
    backgroundColor: Colors.gray,
  },
});

export default Picker;
