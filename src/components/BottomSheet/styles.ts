import { Colors } from "@/src/constants/Colors";
import { FONTS } from "@/src/constants/Fonts";
import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: scale(20),
    paddingVertical: scale(20),
    backgroundColor:Colors.inputBackground,
    height:'100%'
  },
  contentCenter: {
    alignItems: "center",
  },
  container: {
    backgroundColor: Colors.inputBackground,
  },
  handleComponent: {
    backgroundColor: 'white',
    height: 5,
    width: 40,
    alignSelf: "center",
    borderRadius: 10,
    top: 15,
  },
});
export default styles;
