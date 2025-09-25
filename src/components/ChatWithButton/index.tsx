import { Image, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import Images from "@/src/assets/Images";

interface ChatWithButtonProps {
  onPress: () => void;
}

const ChatWithButton: React.FC<ChatWithButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image source={Images.logo} style={styles.image} />
      <Text style={styles.text}>Chat with Swift.AI</Text>
    </TouchableOpacity>
  );
};
export default ChatWithButton;
