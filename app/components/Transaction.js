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
  const { month, amount} = item;
  return (
    <View style={styles.container} >
      <View style={styles.transactionLeft}>
        <Text style= {styles.contentMonth}>{month}</Text>
      </View>
      <View style={styles.transactionRight}>
        {amount[0] === '-' ? (
        <Text style= {styles.contentNegativeAmount}>{amount} </Text>
         ): <Text style= {styles.contentPositiveAmount}>{amount} </Text>
        }
      </View>
      </View>
  );
};

const width = Dimensions.get('window').width - 40;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.LIGHT,
    //width: '90%',
    height: 100,
    padding: 8,
    borderRadius: 5,
    marginBottom: 2,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.DARK,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 1,
    shadowOpacity: 0.25,
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.LIGHT,
  },
contentMonth: {
  color: colors.DARK,
  fontSize: 20,
},
contentPositiveAmount: {
  color: 'green',
  fontSize: 20,
},
contentNegativeAmount: {
  color: colors.ERROR,
  fontSize: 20,

},
transactionLeft: {
  paddingLeft: 20,
},
transactionRight: {
  paddingRight: 200,
},
icon: {
    height:50,
    width: 50,
    marginRight: 25,
},
});

export default Transaction;
