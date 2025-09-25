import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { Colors } from '@/src/constants/Colors';
import * as Clipboard from 'expo-clipboard';
import { styles } from './style';

interface OTPInputProps {
  onOTPChange: (otp: string) => void;
  autoFocus?: boolean;
  otp:string[]
  setOtp:()=>void
}

const OTPInput: React.FC<OTPInputProps> = ({otp,setOtp ,onOTPChange, autoFocus = false }) => {
  // const [otp, setOtp] = useState<string[]>(Array(4).fill(''));
  const inputRefs = useRef<TextInput[]>([]);

  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus]);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Join all digits and notify parent
    const otpString = newOtp.join('');
    onOTPChange(otpString);

    // Auto-focus next input if there's text
    if (text && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Handle backspace
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = async (index: number) => {
    try {
      const clipboardContent = await Clipboard.getStringAsync();
      if (clipboardContent && /^\d{6}$/.test(clipboardContent)) {
        const digits = clipboardContent.split('');
        const newOtp = [...otp];
        digits.forEach((digit: string, i: number) => {
          if (index + i < 6) {
            newOtp[index + i] = digit;
          }
        });
        setOtp(newOtp);
        onOTPChange(newOtp.join(''));
        Keyboard.dismiss();
      }
    } catch (error) {
      console.error('Error pasting OTP:', error);
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          ref={(ref) => (inputRefs.current[index] = ref as TextInput)}
          style={styles.input}
          value={digit}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          keyboardType="number-pad"
          maxLength={1}
          selectTextOnFocus
          autoFocus={index === 0 && autoFocus}
        />
      ))}
    </View>
  );
};

export default OTPInput; 