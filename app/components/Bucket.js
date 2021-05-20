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

const Bucket = ({ item, onPress }) => {
  const { title, goal, balance, targetDate, icon } = item;
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.bucketLeft}>
              <Image style={styles.icon} source = {JSON.parse(icon)} /> 

            </View>
      <View>
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
      <Text>{goal}</Text>
      <Text>{balance}</Text>
      <Text>{targetDate}</Text>
      </View>
    </TouchableOpacity>
  );
};

const width = Dimensions.get('window').width - 40;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.PRIMARY,
    //width: '90%',
    height: 100,
    padding: 8,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.LIGHT,
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
