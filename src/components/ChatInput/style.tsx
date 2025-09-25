import { Colors } from "@/src/constants/Colors";
import { FONTS } from "@/src/constants/Fonts";
import { StyleSheet } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  footerStyle: {
    height: verticalScale(100),
  },
  chatContainer: {
    flex: 1,
  },
  chatContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  messageContainer: {
    maxWidth: "80%",
    marginVertical: 8,
    padding: 12,
    borderRadius: 16,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: Colors.primary,
  },
  assistantMessage: {
    alignSelf: "flex-start",
    backgroundColor: Colors.ReplyBg,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  userMessageText: {
    color: Colors.white,
  },
  assistantMessageText: {
    color: Colors.black,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: scale(20),
    borderTopWidth: 1,
    borderTopLeftRadius: scale(40),
    borderTopRightRadius: scale(40),
    height: scale(120),
    // backgroundColor: Colors.black,
  },
  input: {
    flex: 1,
    height: scale(60),
    backgroundColor: Colors.backgroundGray,
    borderRadius: scale(8),
    color: Colors.text,
    fontFamily: FONTS.regular,
    paddingHorizontal: scale(16),
    paddingVertical: scale(5),
    marginRight: scale(8),
    fontSize: scale(14),
    // paddingTop: scale(20),
  },
  sendButton: {
    padding: scale(15),
    height: scale(60),
    borderRadius: scale(8),
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  sendButtonActive: {
    backgroundColor: Colors.primary,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.pink,
    padding: scale(12),
    margin: scale(16),
    borderRadius: scale(8),
  },
  errorText: {
    color: Colors.red,
    flex: 1,
    marginRight: scale(8),
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical:scale( 32),
  },
  emptyText: {
    color: Colors.ChatPlaceHolder,
    fontSize:scale( 16),
    textAlign: "center",
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
});
