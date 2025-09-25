import React, { useEffect } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { styles } from "./style";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/src/constants/Colors";
interface ChatInputProps {
  isLoading: boolean;
  value: string;
  onChangeText: (text: string) => void;
  onPressSend: () => void;
  disable: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
  isLoading,
  value,
  onChangeText,
  onPressSend,
  disable,
}) => {
  return (
    <LinearGradient
      colors={["#000000", "#5A5A5A"]}
      start={{ x: 1, y: 0.5 }}
      end={{ x: 1, y: 1.8 }}
      style={styles.inputContainer}
    >
      <TextInput
        editable={!disable}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder="Enter your Prompt to ask."
        placeholderTextColor={Colors.ChatPlaceHolder}
        multiline
        // maxLength={1000}
      />
      {/* <TouchableOpacity
        style={[
          styles.sendButton,
          (!value || isLoading) && styles.sendButtonDisabled,
        ]}
      >
        <Ionicons name="mic" size={24} color={Colors.primary} />
      </TouchableOpacity> */}
      <TouchableOpacity
        onPress={onPressSend}
        disabled={!value || isLoading}
        style={[
          styles.sendButton,
          (isLoading) && styles.sendButtonDisabled,
        ]}
      >
        <Ionicons
          name="send"
          size={24}
          color={!value || isLoading ? Colors.white : Colors.white}
        />
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default ChatInput;
