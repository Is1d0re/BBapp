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
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Bucket from '../components/Bucket';
import BucketInputModal from '../components/BucketInputModal';
import NotFound from '../components/NotFound';
import RoundIconBtn from '../components/RoundIconBtn';
import SearchBar from '../components/SearchBar';
import { useBuckets } from '../contexts/BucketProvider';
import colors from '../misc/colors';

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

  const handleOnSubmit = async (title, desc) => {
    const bucket = { id: Date.now(), title , desc, time: Date.now() };
    const updatedBuckets = [...buckets, bucket];
    setBuckets(updatedBuckets);
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
  };

  const handleOnClear = async () => {
    setSearchQuery('');
    setResultNotFound(false);
    await findBuckets();
  };

  return (
    <>
      <SafeAreaView />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.header}>{`Good ${greet} ${user.name}`}</Text>
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
              numColumns={2}
              columnWrapperStyle={{
                justifyContent: 'space-between',
                marginBottom: 15,
              }}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <Bucket onPress={() => openBucket(item)} item={item} />
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
      
      <Button title='reset databases' color='red' onPress={() => AsyncStorage.clear()} />

    </>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    flex: 1,
    zIndex: 1,
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
    backgroundColor: colors.PRIMARY
  },
});

export default BucketScreen;