import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import colors from '../misc/colors';
import imageMap from '../misc/imageMap';
import xtype from 'xtypejs'
import { AntDesign } from '@expo/vector-icons';


const Transaction = ({ item, onPress }) => {
  const { selectedDate, amount, newBalance, multiplier} = item;
  const selectedDateObject = new Date(JSON.parse(selectedDate))
  // const multiplier = item.mul
  return (
    <View style={styles.container} >
      <View style={styles.transactionLeft}>
        <Text style= {styles.contentMonth}>{(selectedDateObject).toDateString()}</Text>
      </View>
      <View style={styles.transactionCenter}>
        <View style={[styles.transactionAmount, multiplier === '-1' ? styles.transactionNegativeAmount: styles.transactionPositiveAmount]}>
        {multiplier === '-1' ? (
        <Text style= {styles.contentNegativeAmount}>${amount} </Text>
         ): <Text style= {styles.contentPositiveAmount}>${amount} </Text>
        }
        </View>
        
      </View>
      <View style={styles.transactionRight}>
        <Text style={styles.newBalance}>${newBalance}</Text>
      </View>
      </View>
  );
};

const width = Dimensions.get('window').width - 40;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.LIGHT,
    //width: '90%',
    height: 50,
    padding: 2,
    borderRadius: 5,
    marginBottom: 2,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.DARK,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 1,
    shadowOpacity: 0.25,
    justifyContent: 'flex-start',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 12,
    color: colors.LIGHT,
  },
contentMonth: {
  color: colors.DARK,
  fontSize: 12,
},
contentPositiveAmount: {
  color: 'green',
  fontSize: 12,
},
contentNegativeAmount: {
  color: colors.ERROR,
  fontSize: 12,

},
transactionLeft: {
  paddingLeft: 20,
  marginRight: 30,
},
transactionCenter: {
  // paddingRight: 150,
},
transactionRight: {
  paddingLeft: 50,
},
transactionAmount: {
  width: 90,
  flexDirection: 'row',
  justifyContent: 'center',
  borderRadius: 80,
  padding: 5,
},
transactionPositiveAmount: {
  backgroundColor: '#90f5ab',
},
transactionNegativeAmount: {
  backgroundColor: '#f7abab',
},
newBalance: {
  fontSize: 16,
  opacity: 0.6,
},
icon: {
    height:50,
    width: 50,
    marginRight: 25,
},
});

export default Transaction;
