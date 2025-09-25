"use client";

import type React from "react";
import { useMemo } from "react";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import styles from "./styles";
import { Colors } from "@/src/constants/Colors";
import { scale } from "react-native-size-matters";

interface BottomSheetProps {
  reference: React.RefObject<BottomSheet>;
  handleChatWith: () => void;
  closeTable: () => void;
  children?: React.ReactNode;
  hideSheet?: boolean;
  allowClose: boolean;
  table: boolean
}

const BottomSheetCustom: React.FC<BottomSheetProps> = ({
  reference,
  handleChatWith,
  children,
  hideSheet,
  allowClose,
  closeTable,
  table
}) => {
  const snapPoints = useMemo(() => ["82%"], []);

  return (
    <BottomSheet
      ref={reference}
      enableDynamicSizing={false}
      snapPoints={snapPoints}
      index={hideSheet ? -1 : 0}
      overDragResistanceFactor={0}
      onClose={() => {
        if (table) {
          closeTable()
        }
      }
      }

      backgroundComponent={({ style }) => (
        <View style={[style, { backgroundColor: Colors.background, borderWidth: 0, elevation: 0, shadowOpacity: 0 }]} />
      )}
      enablePanDownToClose={true}
      handleComponent={
        () => (
          <View style={{
            height: scale(20),
            borderTopLeftRadius: scale(10),
            borderTopRightRadius: scale(10),
            borderColor: Colors.inputBackground,
            borderWidth: 0,
            backgroundColor: Colors.inputBackground,

          }}>
            {
              true && <View
                style={styles.handleComponent}
              />
            }
          </View>
        )

      }

    // onChange={handleChatWith}
    >
      <BottomSheetView
        style={[
          styles.contentContainer,
          { paddingHorizontal: table ? scale(10) : scale(20) },
        ]}
      >
        <BottomSheetScrollView
          contentContainerStyle={{ alignItems: "center" }}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </BottomSheetScrollView>
      </BottomSheetView>

    </BottomSheet>
  );
};

export default BottomSheetCustom;
