import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { verticalScale, moderateScale, scale } from "react-native-size-matters";
import { Colors } from "../../constants/Colors";
import Picker from "../Picker";
import Icon from "@/src/assets/Icons";
import { galleryPicker, cameraPicker } from "@/src/Utils/Utils";
import { Image } from "expo-image";

const ImageSelector = ({ source, setProfileImage }) => {
  const pick = [
    {
      label: "Camera",
      value: "camera",
    },
    {
      label: "Gallery",
      value: "gallery",
    },
  ];
  const imagePicker = async (type: string) => {
    if (type === "camera") {
      const result = await cameraPicker();
      setProfileImage(result);
    } else if (type === "gallery") {
      const result = await galleryPicker();
      setProfileImage(result);
    }
  };
  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  return (
    <View>
      <View style={styles.imageContainer}>
        <Image
          source={source}
          placeholder={{ blurhash }}
          style={styles.img}
          contentFit="cover"
          transition={1000}
        />
      </View>
      <View style={styles.camera}>
        <Picker
          label={"Select1"}
          data={pick}
          dropDownStyle={{
            height: verticalScale(100),
          }}
          onSelect={(item) => {
            setTimeout(() => {
              imagePicker(item.value);
            }, 500);
          }}
        >
          <Icon
            name="camera"
            family="FontAwesome6"
            color={Colors.primary}
            size={13}
          />
        </Picker>
      </View>
    </View>
  );
};

export default ImageSelector;

const styles = StyleSheet.create({
  imageContainer: {
    width: verticalScale(110),
    height: verticalScale(110),
    borderColor: Colors.groupBorderColor,
    borderWidth: 4,
    alignSelf: "center",
    marginTop: verticalScale(20),
    borderRadius: moderateScale(15),
    overflow: "hidden",
  },
  img: {
    height: "100%",
    width: "100%",
    overflow: "hidden",
  },
  camera: {
    width: verticalScale(25),
    height: verticalScale(25),
    backgroundColor: Colors.white,
    position: "absolute",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.groupBorderColor,
    borderWidth: 3,
    bottom: verticalScale(-10),
    right: scale(100),
    zIndex: 1,
  },
});
