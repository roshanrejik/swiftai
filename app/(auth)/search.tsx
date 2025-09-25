import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import Layout from "@/src/components/Layout";
import Input from "@/src/components/Input";
import Header from "@/src/components/Header/index";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { Colors } from "@/src/constants/Colors";

export default function About() {
  const [search, setSearch] = useState("");

  return (
    <Layout
      backgroundColor="transparent"
      Header={
        <>
          <Header
            title={"Search"}
            topHeight={65}
            leftBtn={true}
            leftIcon={{
              family: "Ionicons",
              name: "caret-back-outline",
              size: 20,
              color: Colors.black,
            }}
            leftBtnHandler={() => {
              router.back();
            }}
          />
        </>
      }
    >
      <View style={styles.container}>
        <Input
          label="Search"
          placeholder="Enter Search"
          SectionStyle={styles.sectionStyle}
          InputProps={{
            value: search,
            autoCapitalize: "none",
          }}
          LableStyle={styles.labelStyle}
          onChangeText={(txt) => {
            setSearch(txt);
          }}
          allowFloat={false}
          InputStyle={styles.inputStyle}
          leftIcon={{
            Family: "Font-Awsome",
            name: "search",
            size: 20,
          }}
        />
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(10),
  },
  labelStyle: {
    marginVertical: verticalScale(5),
    fontSize: moderateScale(14),
  },
  inputStyle: {
    fontSize: moderateScale(11),
    height: verticalScale(35),
  },
  sectionStyle: {
    paddingVertical: 0,
    paddingRight: scale(6),
  },
});
