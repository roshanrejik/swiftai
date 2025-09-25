"use client";

import Icon from "@/src/assets/Icons";
import Images from "@/src/assets/Images";
import ChatWithButton from "@/src/components/ChatWithButton";
import HomeHeader from "@/src/components/HomeHeader";
import { Colors } from "@/src/constants/Colors";
import { FONTS } from "@/src/constants/Fonts";
import { router } from "expo-router";
import { RefObject, useRef, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Markdown from "react-native-markdown-display";
import { scale } from "react-native-size-matters";
import type { BottomSheetModalRef } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetModalProvider/types";
import BottomSheetCustom from "@/src/components/BottomSheet";
import { Theme } from "@/src/constants/Theme";
import BottomSheet, { useBottomSheet } from "@gorhom/bottom-sheet";
import { HOW_TO_USE_APP } from "@/src/constants/Constant";

const pacingTableData = `You’ve identified that your runner operates at the 412-point level. Now, you want to incorporate interval training on the track. This app provides foundational instructions for effectively using the Pacing Tables for Interval Training, while a subsequent section will focus on road running (for further details, refer to the "Pacing Tables for Long-Distance Running"). The Pacing Tables for Interval Training are recalibrated at every 50-point increment. Since 412 falls around the midpoint between 400 and 450, it’s advisable to start your runner at the 400-point level and then progress from there, referencing the pacing table sample for the 400-point level. \n \n \n
The fundamental workout is derived directly from the tables: have your runner select an entry and execute the workout as prescribed. For example, at the 400-point level, there are numerous equivalent workouts available. The table features 150 different workouts for each point level, but in reality, there are countless combinations since you can mix and match across the app. As the coach, your focus should be on the specific workout you want each category of runner to undertake. Each individual then performs their workout based on the times designated for their respective point level. Consequently, for a specific workout, each runner in the group will have a unique time to aim for. For instance, if you have five runners on your team, and you want them to complete 12 x 500m intervals, you would consult the pacing table to find the closest 500m time for each runner’s ability. A runner at the 700-point level would complete each interval in 1:25, while a 400-point runner would target 2:05. Keep in mind that the pacing tables can also serve as a predictor of your runner’s future performance in races or time trials. As a runner enhances their training, they’ll likely execute the intervals at a pace corresponding to a higher point level in the tables. This offers insight into the runner’s potential performance at that elevated level during a race. For example, if a runner at the 412-point level consistently performs intervals at the 480-point level, they are anticipated to improve their race performance to match that level, potentially reducing their 5000 meters time from 20:30 to approximately 18:45. Before proceeding, it’s essential to consider that some runners excel during workouts while others shine in competitions. If you notice this discrepancy, take it into account. You might find that the runner performs intervals at a higher point level in practice than in actual races. The coach should consider this when translating workouts to racing scenarios.
`;

const aiTableData = `| Points | 100m   | 200m   | 400m   | 800m   | 1000m  | 1500m  | 2000m |
| ------ | ------ | ------ | ------ | ------ | ------ | ------ | ----- |
| 100    | 24.80s | 51.00s | 1:55.0 | 4:10.0 | 5:20.0 | 8:15.0 | 11:20 |
| 200    | 23.10s | 48.00s | 1:47.0 | 3:55.0 | 5:00.0 | 7:45.0 | 10:40 |
| 400    | 21.00s | 44.20s | 1:37.0 | 3:30.0 | 4:25.0 | 6:50.0 | 9:20  |
| 600    | 19.20s | 40.20s | 1:26.5 | 3:05.0 | 3:55.0 | 6:05.0 | 8:20  |
| 800    | 17.60s | 36.80s | 1:17.5 | 2:40.0 | 3:25.0 | 5:20.0 | 7:20  |
| 1000   | 16.20s | 33.90s | 1:09.0 | 2:20.0 | 3:00.0 | 4:45.0 | 6:40  |
| 2000   | 10.00s | 20.50s | 0:46.0 | 1:35.0 | 2:15.0 | 3:35.0 | 5:00  |
`;

const lastDesc = `When your runners are engaged in long-distance training, it’s important to determine the total time they should run for a given distance based on the goal pace you set. Alternatively, you might know the total time they ran for a specific distance and want to easily calculate the pace for that run. The Pacing Tables for Long Distance Running provide a straight forward method to compute the pace and/or total time. A sample of a Pacing Table for Long Distance Running is available in the app. On the left side, you’ll find the per-mile or per-kilometer pace, and to the right, several distances with the total time displayed if the runner maintains that pace throughout. For example, at a 5:45 mile pace, the time for a 10K would be 36:00. If a runner completes a half-marathon in 1:18:45, their per-mile pace would be easily calculated as 6:00 per mile. These per-mile and per-kilometer tables are invaluable for planning long-distance training runs since pace is a critical factor.`;

const customStyles = StyleSheet.create({
  container:{
    backgroundColor:'red'
  },
  body: {
    color: Colors.white,
    fontFamily: FONTS.regular,
    top: 10,
    fontSize: 10, 
    // Adjust the base font size for all text
  },
  heading1: {
    color: Colors.white,
    fontFamily: FONTS.medium,
  
    fontSize: 11, // Adjust font size for H1 headings
  },
  paragraph: {
    color: Colors.white,
    fontFamily: FONTS.regular,
    fontSize: 10, // Adjust font size for paragraphs
  },
  table:{
    marginBottom:scale(15),
    borderWidth: 1,
    borderColor: 'white',
  }
  // Add more styles for other elements like list_item, strong, em, etc.
});
const HowToUse = () => {
  const [sheetContent, setSheetContent] = useState({
    table: false,
    heading: ``,
    content: ``,
    tableContent: [],
  });
  const [showTable, setShowTable] = useState(false);
  const bottomSheetRef = useRef<RefObject<BottomSheet>>(null);

  const rightIcon = () => {
    return (
      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.settingsContainer}
      >
        <Icon
          family="AntDesign"
          name="left"
          size={15}
          color={Colors.placeHolder}
        />
      </TouchableOpacity>
    );
  };
  const RenderBoxes = ({
    text,
    onPressBox,
  }: {
    text: string;
    onPressBox?: () => void;
  }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPressBox}
        style={styles.boxContainer}
      >
        <Text style={styles.textBox}>{text}</Text>
      </TouchableOpacity>
    );
  };
  const bottomSheetContent = () => {
    const { table, heading, content, tableContent } = sheetContent;
    return (
      <View style={{ width: "100%" }}>
        {showTable ? (
          <View>
            <TouchableOpacity
              onPress={() => setShowTable(false)}
              style={{marginBottom:30,alignItems:'flex-end'}}
            >
              <Icon
                family="AntDesign"
                name="closecircle"
                size={scale(20)}
                color={Colors.placeHolder}
              />
            </TouchableOpacity>
            <Text style={[styles.sheet1Heading, { marginBottom: 20 }]}>
              {heading}
            </Text>
            {tableContent?.map((content) => {
              return (<Markdown  style={customStyles}>{content}</Markdown>);
            })}
          </View>
        ) : (
          <View>
            <View>
              <Text style={styles.sheet1Heading}>{heading}</Text>
              <Text style={styles.sheet1Desc}>{content}</Text>
            </View>
            <View
              style={{
                marginTop: scale(25),
                alignSelf: "flex-start",
              }}
            >
              {table && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setShowTable(true)}
                  style={{
                    borderColor: "#DF1529",
                    borderWidth: 1,
                    borderRadius: scale(10),
                    padding: 10,
                  }}
                >
                  <Text
                    style={{
                      color: Colors.placeHolder,
                    }}
                  >
                    {table}
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <View
              style={{
                alignSelf: "center",
                marginTop: 10,
                marginBottom: 20,
              }}
            >
              <ChatWithButton onPress={navigateToHome} />
            </View>
          </View>
        )}
      </View>
    );
  };

  const navigateToHome = () => {
    bottomSheetRef?.current?.close();
    router.push({
      pathname: "/(mainstack)",
      params: { hideSheet: true },
    });
  };

  const handleSheet1 = (option) => {
    setSheetContent(HOW_TO_USE_APP[option]);
    bottomSheetRef.current?.snapToIndex(0);
  };

  return (
    <View style={styles.container}>
      <View>
        <HomeHeader rightIcon={rightIcon()} heading="How To Use This App" />
      </View>
      <Image
        resizeMode="contain"
        style={styles.imageLogo}
        source={Images.logo}
      />
      <RenderBoxes
        onPressBox={() => handleSheet1("option1")}
        text={"Calculating Your Runner’s Point Score with Al"}
      />
      <RenderBoxes
        onPressBox={() => handleSheet1("option2")}
        text={
          "Pacing Tables in AI for Interval Training from 100 - 2000 points level"
        }
      />
      <RenderBoxes
        onPressBox={() => handleSheet1("option3")}
        text={'Intermediate "Split" Tables for 400m pace'}
      />
      <RenderBoxes
        onPressBox={() => handleSheet1("option4")}
        text={"Ask AI Reduced Speed Tabs"}
      />
      <RenderBoxes
        onPressBox={() => handleSheet1("option5")}
        text={
          "Using the Pacing Tables in AI for Long Distance Running, per-mile and per-kilometer tables are invaluable"
        }
      />
      <ChatWithButton onPress={navigateToHome} />
      <BottomSheetCustom
        reference={bottomSheetRef}
        children={bottomSheetContent()}
        hideSheet={true}
        allowClose
        table={showTable}
        closeTable={()=>setShowTable(false)}
      />
      {/* <BottomSheetCustom reference={tableSheetRef} children={tableBottomsheet()} hideSheet={true} allowClose /> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    alignItems: "center",
  },
  sheet1Heading: {
    fontFamily: FONTS.bold,
    fontSize: scale(16),
    color: Colors.placeHolder,
    lineHeight: scale(20),
    width: Theme.screenSize.width * 0.9,
    // paddingTop:10
  },
  sheet1Desc: {
    fontFamily: FONTS.medium,
    fontSize: scale(12),
    color: Colors.placeHolder,
    lineHeight: scale(20),
    marginTop: scale(10),
  },
  settingsContainer: {
    backgroundColor: Colors.inputBackground,
    padding: scale(10),
    borderRadius: scale(8),
  },
  imageLogo: {
    width: scale(170),
    height: scale(170),
  },
  boxContainer: {
    backgroundColor: Colors.inputBackground,
    width: scale(300),
    marginTop: scale(15),
    paddingHorizontal: scale(10),
    paddingVertical: scale(15),
    borderRadius: scale(8),
    alignItems: "center",
  },
  textBox: {
    fontFamily: FONTS.medium,
    fontSize: scale(13),
    color: Colors.placeHolder,
    textAlign: "center",
    lineHeight: scale(18),
  },
  whatButton: {
    marginTop: scale(20),
  },
});

export default HowToUse;
