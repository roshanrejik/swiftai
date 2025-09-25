import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { verticalScale, scale } from "react-native-size-matters";
import { Colors } from "../../constants/Colors";

interface LayoutProps {
  /**
   * A React component to render as the header of the layout. Defaults to null.
   */
  Header?: React.ReactNode;
  /**
   * A React component to render as the footer of the layout. Defaults to null.
   */
  Footer?: React.ReactNode;
  /**
   * The content to be displayed within the layout.
   */
  children: React.ReactNode;
  /**
   * The height (in pixels) to add an empty space at the bottom of the layout. Defaults to 0.
   */
  height?: number;
  backgroundColor?: string;
  scroll?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  Header = null,
  Footer = null,
  children,
  height = 0,
  backgroundColor = Colors.white,
  scroll = false,
}) => {
  return (
    <View style={styles.Container}>
      <StatusBar barStyle={"dark-content"} backgroundColor={backgroundColor} />
      <View style={styles.layout}>
        {Header}
        <View style={styles.scroll}>{children}</View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.footerContainer}
        >
          {Footer}
        </KeyboardAvoidingView>
        <View style={{ height }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  layout: {
    width: "100%",
    flex: 1,
    marginTop: Platform.OS === "ios" ? verticalScale(20) : verticalScale(-5),
  },
  scroll: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  footerContainer: {
    width: "100%",
  },
});

export default Layout;
