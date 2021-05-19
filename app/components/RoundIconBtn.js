import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import colors from '../misc/colors';

const RoundIconBtn = ({ antIconName, size, color, style, onPress }) => {
  return (
    <TouchableOpacity style={[styles.icon, { ...style }]}  onPress={onPress}>
    <AntDesign
      name={antIconName}
      size={size || 24}
      color={color || colors.LIGHT}
    />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    backgroundColor: colors.PRIMARY,
    padding: 15,
    borderRadius: 50,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 2,
    shadowOpacity: 0.25,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RoundIconBtn;