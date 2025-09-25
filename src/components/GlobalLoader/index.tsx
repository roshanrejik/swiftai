import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet, Modal } from 'react-native';
import { Colors } from '@/src/constants/Colors';
import { scale, verticalScale } from 'react-native-size-matters';

interface GlobalLoaderProps {
  visible: boolean;
  message?: string;
}

const GlobalLoader: React.FC<GlobalLoaderProps> = ({ visible, message = 'Loading...' }) => {
  if (!visible) return null;

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      statusBarTranslucent
    >
      <View style={styles.container}>
        <View style={styles.loaderBox}>
          <ActivityIndicator size="large" color={Colors.primary} />
          {message && <Text style={styles.message}>{message}</Text>}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderBox: {
    backgroundColor: Colors.white,
    borderRadius: scale(10),
    padding: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
    width: scale(200),
    height: scale(200),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  message: {
    marginTop: verticalScale(15),
    fontSize: scale(16),
    color: Colors.darkGreyText,
    textAlign: 'center',
  },
});

export default GlobalLoader; 