import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import colors from '../misc/colors';

const RoundIconBtn = ({ antIconName, size, color, style, onPress, submit }) => {
  return (
    <TouchableOpacity style={[styles.icon, { ...style }]}  onPress={onPress}>
    {submit !== 'submit' ? (<AntDesign
      name={antIconName}
      size={size || 24}
      color={color || colors.LIGHT}
    />) : <Text style={styles.text}>Submit</Text>

}
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
  text: {
    color: colors.LIGHT,
    fontSize: 20,
  }
});

export default RoundIconBtn;