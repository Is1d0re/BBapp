import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  ColorPropType,
} from 'react-native';
import colors from '../misc/colors';
import imageMap from '../misc/imageMap';
import RoundIconBtn from '../components/RoundIconBtn';
import xtype from 'xtypejs'

const Bucket = ({ item, onPress, openEditModal }) => {
  const { title, goal, balance, targetDate, icon, transactions } = item;
  const targetDateObject = new Date(JSON.parse(targetDate));
 


  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.bucketLeft}>
              <Image style={styles.icon} source = {JSON.parse(icon)} /> 

            </View>
      <View>
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
      <Text style= {styles.content} >Goal: ${goal}</Text>
      <Text style= {styles.content} >Current Balance: ${balance}</Text>

    <Text style= {styles.content} >Goal Date: {(targetDateObject).toDateString()}</Text>
      </View>

    

    </TouchableOpacity>

    

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
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.PRIMARY,
  },
content: {
  color: colors.DARK,
},
bucketLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
},
icon: {
    height:50,
    width: 50,
    marginRight: 25,
},
});

export default Bucket;
