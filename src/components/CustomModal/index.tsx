import { Colors } from "@/src/constants/Colors";
import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  ActivityIndicator,
} from "react-native";
import { scale } from "react-native-size-matters";

type Props = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  loader?: boolean;
  setLoader?: (loader: boolean) => void;
};

const CustomModal: React.FC<Props> = ({
  visible,
  onClose,
  title = "Logout",
  message = "Are you sure you want to logout?",
  confirmText = "Yes",
  cancelText = "Cancel",
  onConfirm,
  loader,
  setLoader,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
    >
      <View style={styles.centeredView}>
        <View style={[styles.modalView,{
          width:loader ? "30%" : "80%",
        }]}>
          {
            loader ? <View style={{ height: scale(65),alignItems: "center", justifyContent: "center" }}><ActivityIndicator size="large" color={Colors.primary} /></View> :
              (
                <>
                  {title ? <Text style={styles.title}>{title}</Text> : null}
                  {message ? <Text style={styles.message}>{message}</Text> : null}

                  <View style={styles.buttonRow}>
                    <Pressable
                      style={[styles.button, styles.cancelButton]}
                      onPress={onClose}
                    >
                      <Text style={styles.textStyle}>{cancelText}</Text>
                    </Pressable>

                    <Pressable
                      style={[styles.button, styles.confirmButton]}
                      onPress={() => {
                        onConfirm?.();
                        
                      }}
                    >
                      <Text style={styles.textStyle}>{confirmText}</Text>
                    </Pressable>
                  </View></>
              )
          }

        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // dim background
  },
  modalView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    elevation: 5,

  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  message: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: "center",
    color: "#555",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#999",
  },
  confirmButton: {
    backgroundColor: "#E53935",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
  },
});

export default CustomModal;
