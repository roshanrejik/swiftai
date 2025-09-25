import React from "react";
import { ActivityIndicator, Modal, StyleSheet, View } from "react-native";
import { Colors } from "../../constants/Colors";

interface LoaderModalProps {
  /**
   * A boolean value that determines whether the modal is visible. Defaults to false.
   */
  visibility?: boolean;
  /**
   * A callback function that sets the visibility state of the modal.
   */
  setVisibility?: (isVisible: boolean) => void;
}

const LoaderModal: React.FC<LoaderModalProps> = (props) => {
  const renderContent = (): React.ReactNode => ( // Use React.ReactNode for flexible content
    <View style={styles.modal}>
      <View style={styles.body}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    </View>
  );

  return (
    <Modal
      visible={props?.visibility ? props?.visibility : false} // Ensure visibility defaults to false
      statusBarTranslucent={true}
      animationType="fade"
      transparent={true}
      onRequestClose={() => {
        props?.setVisibility?.(!props?.visibility); // Handle optional setVisibility callback
      }}
    >
      {renderContent()}
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    backgroundColor: "#00000020",
  },
  body: {
    alignSelf: "center",
  },
});

export default LoaderModal;
