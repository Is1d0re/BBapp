import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import colors from '../misc/colors';

const CloseIconBtn = ({ antIconName, size, color, style, onPress }) => {
  return (
    <TouchableOpacity style={[styles.icon, { ...style }]}  onPress={onPress}>
    <AntDesign
      name={antIconName}
      size={size || 25}
      color={color || colors.DARK}
    />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    borderRadius: 50,
    elevation: 5,
    width: 40,
  },
});

export default CloseIconBtn;