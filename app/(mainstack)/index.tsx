import Icon from "@/src/assets/Icons";
import Images from "@/src/assets/Images";
import AnimatedStreamText from "@/src/components/AnimatedText";
import BottomSheetView from "@/src/components/BottomSheet";
import CustomButton from "@/src/components/Button";
import ChatInput from "@/src/components/ChatInput";
import ChatWithButton from "@/src/components/ChatWithButton";
import HomeHeader from "@/src/components/HomeHeader";
import { API_URLS } from "@/src/config/EndPoints";
import { Colors } from "@/src/constants/Colors";
import { FONTS } from "@/src/constants/Fonts";
import apiClient from "@/src/store/api/apiService";
import useAuthStore from "@/src/store/auth/authStore";
import useGeminiStore from "@/src/store/thirdParty/geminiStore";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModalRef } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetModalProvider/types";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import * as Clipboard from 'expo-clipboard';
// import Clipboard from "@react-native-community/clipboard";

import {
  ActivityIndicator,
  FlatList,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { Toast } from "toastify-react-native";
import Markdown from "react-native-markdown-display";
import { getMessages } from "@/src/config/service";

const customStyles = StyleSheet.create({
  body: {
    color: Colors.placeHolder,
    fontFamily: FONTS.unique,
    fontSize: scale(13), // Ad
    paddingRight: scale(8),
    paddingLeft: scale(3),
  },
  heading1: {
    color: Colors.placeHolder,
    fontFamily: FONTS.unique,
    fontSize: scale(13), // Adjust font size for H1 headings
  },
  paragraph: {
    color: Colors.placeHolder,

    fontFamily: FONTS.unique,
    fontSize: scale(13), // Ad
  },
  // Add more styles for other elements like list_item, strong, em, etc.
});

export default function HomeScreen(props) {
  const [inputText, setInputText] = useState("");
  const { updateAvatarsList } = useAuthStore();
  const [showAnimatedly, setShowAnimatedly] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const params = useLocalSearchParams();
  const [currentConversationId, setCurrentConversationId] = useState(params?.conversationId || null);
  const router = useRouter() as ReturnType<typeof useRouter>;
  const { 
    chatHistory, 
    isLoading, 
    error, 
    generateText, 
    clearChat, 
    clearError,
    loadConversationMessages,
  } = useGeminiStore();
  const [disableChat, setDisableChat] = useState(false);
  const bottomSheetRef = useRef<BottomSheetModalRef>(null);



  const handleSend = async () => {
    if (inputText.trim() && !isLoading) {
      const prompt = inputText.trim();
      try {
        setDisableChat(true);
        setShowAnimatedly(true);
        // Pass current conversation ID to maintain conversation context
        // For new chats, pass null and the API will create a new conversation
        await generateText(prompt, currentConversationId);
        setDisableChat(() => false);
        setInputText(() => "");
      } catch (error) {
        setDisableChat(false);
      }

      // Scroll to bottom after sending
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const copyContent =async (content: string) => {
     await Clipboard.setStringAsync(content);

    // Show a success toast
    Toast.success("Text copied to clipboard");
  };

  const getAvatars = async () => {
    const response = await apiClient.get(API_URLS.GET_AVATARS);
    
    updateAvatarsList(response.data.data);
  };

  // Handle topic selection
  const handleTopicSelect = async (topic: any) => {
    try {
      setDisableChat(true);
      setShowAnimatedly(true);
      await generateText(topic.title, null);
      setDisableChat(false);
    } catch (error) {
      setDisableChat(false);
    }
  };


 const getMessagesApi = async () => {
  if(params?.conversationId){
    try {
      // Load conversation messages into the store
      await loadConversationMessages(params.conversationId as string);
      // Set the current conversation ID
      setCurrentConversationId(params.conversationId as string);
    } catch (error) {
    }
  } else {
    // New chat - clear any existing chat history
    clearChat();
    setCurrentConversationId(null);
  }
}
  // Load conversation messages when component mounts or conversationId changes
  useEffect(() => {
    getMessagesApi();
  }, [params?.conversationId]);

  const renderMessage = ({ item }: { item: any }) => {
    const isUser = item?.role === "user";
    return (
      <View
        style={[
          styles.messageContainer,
          isUser ? styles.userMessage : styles.assistantMessage,
          { backgroundColor: isUser ? Colors.black : Colors.inputBackground },
        ]}
      >
        <View
          style={{ flexDirection: "row", alignItems: "center", width: "100%" }}
        >
          {isUser && (
            <TouchableOpacity
              onPress={() => router.push("/profile")}
              style={styles.imageContainer}
            >
              <Image source={Images.profile} style={styles.image} />
            </TouchableOpacity>
          )}

          {isUser ? (
            <Text
              selectable
              style={[
                styles.messageText,
                isUser ? styles.userMessageText : styles.assistantMessageText,
              ]}
            >
              {item.content}
            </Text>
          ) : (
            <View style={styles.streamingContainer}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingLeft: scale(10),
                  paddingRight: scale(20),
                }}
              >
                <View
                  style={{
                    backgroundColor: Colors.black,
                    height: scale(35),
                    borderRadius: 100,
                    width: scale(35),
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    source={Images.logo}
                    style={{
                      width: scale(20),
                      height: scale(20),
                    }}
                  />
                </View>
                <TouchableOpacity
                  activeOpacity={0.8}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  onPress={() => copyContent(item.content)}
                >
                  <Icon color={Colors.grayText} name="copy" size={scale(15)} />
                </TouchableOpacity>
              </View>
              {item.isStreaming ? (
                <>
                  {console.log("Rendering streaming message:", item.content, "Type:", typeof item.content)}
                  <AnimatedStreamText
                  onComplete={() => {
                    // animation khatam -> update store
                    useGeminiStore.setState((state) => {
                      const updatedHistory = state.chatHistory.map((msg) =>
                        msg.timestamp === item.timestamp
                          ? { ...msg, isStreaming: false }
                          : msg
                      );
                      return { chatHistory: updatedHistory };
                    });
                  }}
                  user={isUser}
                  text={item.content || ""}
                />
                </>
              ) : (
                <View style={{paddingHorizontal:scale(10)}}> 
                  <Markdown style={customStyles}>{item.content}</Markdown>
                </View>
              )}
            </View>
          )}
        </View>
      </View>
    );
  };

  const leftIcon = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => router.push("/profile")}
        style={styles.settingsContainer}
      >
        <Icon
          size={scale(22)}
          color={Colors.white}
          name="setting"
          family="AntDesign"
        />
      </TouchableOpacity>
    );
  };

  const rightIcon = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        // onPress={() => bottomSheetRef.current.snapToIndex(0)}
        onPress={() => router.push("/(mainstack)/howToUse")}
        style={styles.settingsContainer}
      >
        <Icon
          size={scale(22)}
          color={Colors.white}
          name="book-open"
          family="SimpleLineIcons"
        />
      </TouchableOpacity>
    );
  };
 

  // New Chat Icon - clears everything and starts fresh
  const newChatIcon = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          // Clear chat history and start new conversation
          clearChat();
          setCurrentConversationId(null);
          // Navigate to home without conversationId
          router.push("/(mainstack)");
        }}
        style={[styles.settingsContainer1,{
          marginRight:scale(10)
        }]}
      >
        <Icon
          family="MaterialIcons"
          color={Colors.white}
          name="add"
          size={25}
        />
      </TouchableOpacity>
    );
  };

  // History Icon - shows when user is on home screen (not from chat history)
  const historyIcon = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          router.push("/(mainstack)/chatsHistory");
        }}
        style={[styles.settingsContainer1,{
          marginRight:scale(10)
        }]}
      >
        <Icon
          family="MaterialIcons"
          color={Colors.white}
          name="history"
          size={30}
        />
      </TouchableOpacity>
    );
  };

  const openSheet = () => {
    bottomSheetRef.current.snapToIndex(1);
  };
  const closeSheet = () => {
    bottomSheetRef.current.close();
  };

  const bottomSheetContent = () => {
    return (
      <>
        <Image
          resizeMode="contain"
          style={styles.imageLogo}
          source={Images.logo}
        />
        <Text style={styles.textContent}>
          At its core, this app offers coaches an easy and convenient way to
          access two types of workouts: interval training on the track and
          long-distance sessions on the road. These workouts are standard for
          most runners and often present a challenge in determining the right
          routine. Yet, with this app, what used to be complicated becomes
          effortless—just click on the relevant link and read the workout
          details.
        </Text>
        <CustomButton
          onPress={() => router.push("/(mainstack)/howToUse")}
          style={styles.whatButton}
          text="What to ask?"
        />
        <ChatWithButton onPress={closeSheet} />
      </>
    );
  };

  return (
    <>
      <LinearGradient
        colors={["#000000", "#000000"]}
        start={{ x: 0, y: 0.8 }}
        end={{ x: 2, y: 0.6 }}
        style={{ flex: 1 }}
      >
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
          <HomeHeader
            home={false}
            image
            heading={params?.title?.length > 15 ? params.title.slice(0,17)+"..." : params.title || "Swift.AI"}
            extraIcon={params?.conversationId ? newChatIcon() : historyIcon()}
            rightIcon={rightIcon()}
            leftIcon={leftIcon()}
            
          />
          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity onPress={clearError}>
                <Ionicons name="close-circle" size={24} color={Colors.red} />
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.chatContainer}>
            <FlatList
              ref={flatListRef}
              data={chatHistory}
              renderItem={renderMessage}
              keyExtractor={(_, index) => index.toString()}
              contentContainerStyle={styles.chatContent}
              onContentSizeChange={() =>
                flatListRef.current?.scrollToEnd({ animated: true })
              }
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>
                    Start a conversation with Swift AI
                  </Text>
                </View>
              }
              ListFooterComponent={
                isLoading ? (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="small" color={Colors.primary} />
                    <Text style={styles.loadingText}>Thinking...</Text>
                  </View>
                ) : (
                  <View style={styles.footerStyle} />
                )
              }
            />
          </View>

          <ChatInput
            disable={disableChat}
            value={inputText}
            onChangeText={(val) => setInputText(val)}
            onPressSend={handleSend}
            isLoading={isLoading}
          />
        </KeyboardAvoidingView>
      </LinearGradient>
      {!params?.conversationId && (
        <BottomSheetView
          children={bottomSheetContent()}
          handleChatWith={closeSheet}
          hideSheet={params?.hideSheet}
          reference={bottomSheetRef}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  settingsContainer: {
    // backgroundColor: Colors.white,
    // padding: scale(10),
    borderRadius: scale(8),
  },
  settingsContainer1: {
    // padding: scale(10),
    borderRadius: scale(8),
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: scale(100),
    borderWidth: scale(1),
    marginRight: scale(10),
    marginLeft: scale(10),
  },
  image: {
    height: scale(30),
    width: scale(30),
  },
  footerStyle: {
    height: verticalScale(20),
  },
  chatContainer: {
    flex: 1,
  },
  chatContent: {
    // paddingHorizontal: scale(16),
    paddingBottom: scale(16),
  },
  messageContainer: {
    width: "100%",
    marginVertical: scale(1),
    borderRadius: scale(5),
    paddingVertical: scale(5),
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: Colors.primary,
  },
  assistantMessage: {
    alignSelf: "flex-start",
    backgroundColor: Colors.inputBackground,
    width: "100%",
    fontSize: scale(13),
  },
  messageText: {
    fontSize: scale(13),
    lineHeight: 20,
    fontFamily: FONTS["unique"],
  },
  userMessageText: {
    color: Colors.white,
    textAlign: "left",
    paddingVertical: scale(15),
    width:'84%'
  },
  assistantMessageText: {
    color: Colors.placeHolder,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.ReplyBg,
    bottom: 80,
    height: 100,
    backgroundColor: Colors.white,
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    backgroundColor: Colors.backgroundGray,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    fontSize: 16,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.backgroundGray,
    alignItems: "center",
    justifyContent: "center",
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.pink,
    padding: 12,
    margin: 16,
    borderRadius: 8,
  },
  errorText: {
    color: Colors.red,
    flex: 1,
    marginRight: 8,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: scale(200),
  },
  emptyText: {
    color: Colors.ReplyBg,
    fontSize: 16,
    textAlign: "center",
    fontFamily: FONTS.medium,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  loadingText: {
    marginLeft: 8,
    color: Colors.ChatPlaceHolder,
  },
  textContent: {
    fontSize: 15,
    width: "100%",
    lineHeight: scale(26),
    color: Colors.placeHolder,
    textAlign: "center",
    fontFamily: FONTS.medium,
  },
  whatButton: {
    marginTop: scale(20),
  },
  imageLogo: {
    width: scale(170),
    height: scale(170),
  },
  streamingContainer: {
    width: "100%",
  },
});
