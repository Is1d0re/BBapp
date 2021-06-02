import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  SafeAreaView,
  Button,
  Image,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Bucket from '../components/Bucket';
import BucketInputModal from '../components/BucketInputModal';
import NotFound from '../components/NotFound';
import RoundIconBtn from '../components/RoundIconBtn';
import SearchBar from '../components/SearchBar';
import { useBuckets } from '../contexts/BucketProvider';
import colors from '../misc/colors';
import xtype from 'xtypejs'

const reverseData = data => {
  return data.sort((a, b) => {
    const aInt = parseInt(a.time);
    const bInt = parseInt(b.time);
    if (aInt < bInt) return 1;
    if (aInt == bInt) return 0;
    if (aInt > bInt) return -1;
  });
};

const BucketScreen = ({ user, navigation }) => {
  const [greet, setGreet] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [resultNotFound, setResultNotFound] = useState(false);
  // const [searchFilter, setSearchFilter] = useState([]);

  const { buckets, setBuckets, findBuckets } = useBuckets();

  const findGreet = () => {
    const hrs = new Date().getHours();
    if (hrs === 0 || hrs < 12) return setGreet('Morning, ');
    if (hrs === 1 || hrs < 17) return setGreet('Afternoon, ');
    setGreet('Evening, ');
  };

  useEffect(() => {
    findGreet();
  }, []);

  const reverseBuckets = reverseData(buckets);

  const handleOnSubmit = async (title, goal, balance, targetDate, icon, transactions) => {
    const JSONtargetDate = JSON.stringify(targetDate);
    const JSONtransactions = JSON.stringify(transactions)
    const bucket = { id: Date.now(), title , goal, balance, targetDate, icon, transactions, time: Date.now() };
    const updatedBuckets = [...buckets, bucket];
    setBuckets(updatedBuckets);
    console.log(updatedBuckets);
    await AsyncStorage.setItem('buckets', JSON.stringify(updatedBuckets));
  };

  const openBucket = bucket => {
    navigation.navigate('BucketDetail', { bucket });
  };

  const handleOnSearchInput = async text => {
    setSearchQuery(text);
    if (!text.trim()) {
      setSearchQuery('');
      setResultNotFound(false);
      return await findBuckets();
    }
    const filteredBuckets = buckets.filter(bucket => {
      if (bucket.title.toLowerCase().includes(text.toLowerCase())) {
        return bucket;
      }
    });

    if (filteredBuckets.length) {
      setBuckets([...filteredBuckets]);
    } else {
      setResultNotFound(true);
    }
    // setSearchFilter(buckets);
  };

  const handleOnClear = async () => {
    setSearchQuery('');
    setResultNotFound(false);
    await findBuckets();
  };

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
      <Image style={styles.icon} source = {require('../../assets/BBicon.png')} />
      <Text style={styles.header}>{`Good ${greet} ${user.name}`}</Text>
      </SafeAreaView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
        <View style={styles.bucketsList}>
          <Text style= {styles.pageTitle}>Your Savings Buckets</Text>
          {buckets.length ? (
            <SearchBar
              value={searchQuery}
              onChangeText={handleOnSearchInput}
              containerStyle={{ marginVertical: 15 }}
              onClear={handleOnClear}
            />
          ) : null}
        
          {resultNotFound ? (
            <NotFound />
          ) : (
            <FlatList
              data={reverseBuckets}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <Bucket onPress={() => {openBucket(item); handleOnClear()}} item={item} openEditModal={() => setModalVisible(true)}/>
              )}
            />
          )}

          {!buckets.length ? (
            <View
              style={[
                StyleSheet.absoluteFillObject,
                styles.emptyHeaderContainer,
              ]}
            >
              <Text style={styles.emptyHeader}>Add Buckets</Text>
            </View>
          ) : null}
        </View>
        </View>
        
      </TouchableWithoutFeedback>
      
      <RoundIconBtn
        onPress={() => setModalVisible(true)}
        antIconName='plus'
        style={styles.addBtn}
      />
      <BucketInputModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleOnSubmit}
      />

      
    </>
  );
};

const styles = StyleSheet.create({
  safeArea:{
    backgroundColor: colors.PRIMARY,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'baseline',
  },
  icon: {
    height: 50,
    width: 50,
    marginLeft: 20, 
    marginRight: 20,
    borderRadius: 100,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 15,
    paddingBottom: 18,
    marginTop:10,
    color: colors.LIGHT,
    
  },
  pageTitle: {
    paddingTop: 30,
    fontSize: 22,
    fontWeight: 'bold',
    paddingLeft: 15,
  },
  container: {
    paddingHorizontal: 4,
    flex: 1,
    zIndex: 1,
    backgroundColor: colors.LIGHT,
  },
  emptyHeader: {
    fontSize: 30,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    opacity: 0.2,
  },
  emptyHeaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
  addBtn: {
    position: 'absolute',
    right: 15,
    bottom: 50,
    zIndex: 1,
    borderRadius: 60,
    backgroundColor: colors.PRIMARY,
  },
  bucketsList:{
    backgroundColor: colors.LIGHT,
    padding: 1,
    // borderRadius: 8,
    flex: 2,
  },
  footer:{
    marginTop: 20,
  },
});

export default BucketScreen;