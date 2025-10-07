"use client";

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Platform,
  useColorScheme,
} from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import styles from "./styles";
import { Colors } from "@/src/constants/Colors";
import Icon from "@/src/assets/Icons";

interface DateIconProps {
  date?: string; // accepts DD-MM-YYYY, YYYY-MM-DD, or ISO
  onDateChange?: (backendDate: string) => void; // returns YYYY-MM-DD
  iconSize?: number;
  iconColor?: string;
  border?: boolean;
  backgroundColor?: string;
  labelColor?: boolean;
  value: string; // can be ISO/ YYYY-MM-DD / DD-MM-YYYY
  error?: string;
  required: boolean;
  minimumDate?: Date;
  maximumDate?: Date;
}

/* ---------------- Helpers ---------------- */

const parseDate = (dateString?: string): Date => {
  if (!dateString) return new Date();

  // ISO-like
  if (dateString.includes("T") || dateString.includes("Z")) {
    const d = new Date(dateString);
    return isNaN(d.getTime()) ? new Date() : d;
  }

  // Dashed: YYYY-MM-DD or DD-MM-YYYY
  const parts = dateString.split("-");
  if (parts.length === 3) {
    if (parts[0].length === 4) {
      // YYYY-MM-DD
      const [y, m, d] = parts.map(Number);
      const date = new Date(y, (m || 1) - 1, d || 1);
      return isNaN(date.getTime()) ? new Date() : date;
    } else {
      // DD-MM-YYYY
      const [d, m, y] = parts.map(Number);
      const date = new Date(y || new Date().getFullYear(), (m || 1) - 1, d || 1);
      return isNaN(date.getTime()) ? new Date() : date;
    }
  }

  return new Date();
};

const formatDateForDisplay = (date: Date): string => {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
};

const formatDateForBackend = (date: Date): string => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

/* --------------- Component ---------------- */

export const DateIcon: React.FC<DateIconProps> = ({
  date = "",
  onDateChange,
  iconSize = 24,
  labelColor,
  error = "",
  value,
  required,
  iconColor = Colors.placeHolder,
  minimumDate,
  maximumDate = new Date(),
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    if (value) return parseDate(value);
    if (date) return parseDate(date);
    return new Date();
  });

  // keep internal state in sync if value changes from outside
  useEffect(() => {
    if (value) setSelectedDate(parseDate(value));
  }, [value]);

  const handleConfirm = () => {
    onDateChange?.(formatDateForBackend(selectedDate));
    setShowPicker(false);
  };

  const handleInlineAndroidChange = (event: DateTimePickerEvent, picked?: Date) => {
    setShowPicker(false);
    if (event.type === "set" && picked) {
      setSelectedDate(picked);
      onDateChange?.(formatDateForBackend(picked));
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => setShowPicker(true)}>
      {/* Label */}
      <View style={{ flexDirection: "row" }}>
        <Text style={[labelColor ? styles.labelGray : styles.label]}>
          Date of Birth
        </Text>
        {required ? <Text style={{ color: Colors.red }}>*</Text> : null}
      </View>

      {/* Field */}
      <View style={styles.container}>
        <View style={styles.dateContainer}>
          <Icon
            name="calendar"
            family="AntDesign"
            size={iconSize}
            color={iconColor}
          />
          <Text style={value ? styles.dateText : styles.datePlaceHolder}>
            {value ? formatDateForDisplay(selectedDate) : "Select the Date"}
          </Text>
        </View>

        {/* Picker */}
        {showPicker &&
          (Platform.OS === "ios" ? (
            // iOS — custom modal to control colors in dark mode
            <Modal transparent animationType="fade" onRequestClose={() => setShowPicker(false)}>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  padding: 20,
                  backgroundColor: "rgba(0,0,0,0.5)",
                }}
              >
                <View
                  style={{
                    backgroundColor: isDark ? "#1C1C1E" : "#FFFFFF",
                    padding: 16,
                    borderRadius: 12,
                  }}
                >
                  <DateTimePicker
                    value={selectedDate}
                    mode="date"
                    display="spinner"
                    onChange={(event, picked) => {
                      if (event.type === "set" && picked) {
                        setSelectedDate(picked);
                      }
                    }}
                    minimumDate={minimumDate}
                    maximumDate={maximumDate}
                    // keep picker readable regardless of system theme
                    themeVariant={isDark ? "dark" : "light"}
                    textColor={isDark ? "white" : "black"}
                  />

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 12,
                    }}
                  >
                    <TouchableOpacity onPress={() => setShowPicker(false)}>
                      <Text style={{ color: isDark ? Colors.white : Colors.black }}>
                        Cancel
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleConfirm}>
                      <Text style={{ color: Colors.primary, fontWeight: "600" }}>
                        Confirm
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          ) : (
            // Android — inline system picker
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="spinner"
              onChange={handleInlineAndroidChange}
              minimumDate={minimumDate}
              maximumDate={maximumDate}
              // themeVariant is ignored on Android but harmless to keep
              themeVariant={isDark ? "dark" : "light"}
            />
          ))}
      </View>

      {/* Error */}
      <Text style={styles.errorText}>{error || ""}</Text>
    </TouchableOpacity>
  );
};
