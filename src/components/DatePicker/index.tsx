"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Modal, Platform } from "react-native";
import DateTimePicker, {
  type DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import styles from "./styles";
import { Colors } from "@/src/constants/Colors";
import Icon from "@/src/assets/Icons";

interface DateIconProps {
  date?: string; // Can accept both "DD-MM-YYYY", "YYYY-MM-DD", and ISO format
  onDateChange?: (backendDate: string) => void; // Returns YYYY-MM-DD format for backend
  iconSize?: number;
  iconColor?: string;
  border?: boolean;
  backgroundColor?: string;
  labelColor?: boolean;
  value: string; // Can be ISO format, YYYY-MM-DD, or DD-MM-YYYY
  error?: string;
  required: boolean;
}

// Function to parse different date formats
const parseDate = (dateString: string): Date => {
  if (!dateString) return new Date();

  // Check if it's ISO format (contains 'T' or 'Z')
  if (dateString.includes("T") || dateString.includes("Z")) {
    return new Date(dateString);
  }

  // Check if it's YYYY-MM-DD or DD-MM-YYYY format
  if (dateString.includes("-") && dateString.split("-").length === 3) {
    const parts = dateString.split("-");

    if (parts[0].length === 4) {
      // YYYY-MM-DD format
      const [year, month, day] = parts.map(Number);
      return new Date(year, month - 1, day);
    } else if (parts[0].length <= 2) {
      // DD-MM-YYYY format
      const [day, month, year] = parts.map(Number);
      return new Date(year, month - 1, day);
    }
  }

  // Fallback to current date
  return new Date();
};

export const DateIcon: React.FC<DateIconProps> = ({
  date = "",
  onDateChange,
  iconSize = 24,
  labelColor,
  error = "",
  value,
  required,
  iconColor = "#000",
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    // Parse the value - it could be ISO format, YYYY-MM-DD, or DD-MM-YYYY
    if (value) {
      return parseDate(value);
    }
    if (date) {
      return parseDate(date);
    }
    return new Date();
  });

  // Update selectedDate when value prop changes
  useEffect(() => {
    if (value) {
      setSelectedDate(parseDate(value));
    }
  }, [value]);

  const handleDateChange = (event: DateTimePickerEvent, date?: Date) => {
    setShowPicker(false);
    if (event.type === "set" && date) {
      setSelectedDate(date);

      // Return YYYY-MM-DD format for backend
      const backendDate = formatDateForBackend(date);
      onDateChange?.(backendDate);
    }
  };

  // Format date for display (DD-MM-YYYY)
  const formatDateForDisplay = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Format date for backend (YYYY-MM-DD)
  const formatDateForBackend = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => setShowPicker(true)}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={[labelColor ? styles.labelGray : styles.label]}>
          Date of Birth
        </Text>
        {
          required ? <Text style={{ color: Colors.red }}>*</Text> : null
        }
      </View>
      <View style={styles.container}>
        <View style={styles.dateContainer}>
          <Icon
            name="calendar"
            family="AntDesign"
            size={iconSize}
            color={Colors.placeHolder}
          />
          <Text style={value ? styles.dateText : styles.datePlaceHolder}>
            {value ? formatDateForDisplay(selectedDate) : "Select the Date"}
          </Text>
        </View>

        {showPicker && (
          Platform.OS === "ios" ? (
            // iOS: show inside custom Modal
            <Modal transparent animationType="slide">
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  backgroundColor: "rgba(0,0,0,0.5)",
                }}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    padding: 20,
                    borderRadius: 10,
                  }}
                >
                  <DateTimePicker
                    value={selectedDate}
                    mode="date"
                    display="spinner"
                    onChange={(event, date) => {
                      if (event.type === "set" && date) {
                        setSelectedDate(date);
                      }
                    }}
                    maximumDate={new Date()}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                      marginTop: 10,
                    }}
                  >
                    <TouchableOpacity onPress={() => setShowPicker(false)}>
                      <Text>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        onDateChange?.(formatDateForBackend(selectedDate));
                        setShowPicker(false);
                      }}
                    >
                      <Text>Confirm</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          ) : (
            // ANDROID: no custom Modal needed
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="spinner"
              onChange={(event, date) => {
                setShowPicker(false); // hide after selection
                if (event.type === "set" && date) {
                  setSelectedDate(date);
                  onDateChange?.(formatDateForBackend(date));
                }
              }}
              maximumDate={new Date()}
            />
          )
        )}

      </View>
      <Text style={styles.errorText}>{error || ""}</Text>
    </TouchableOpacity>
  );
};
