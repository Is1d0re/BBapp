import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Alert } from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';
import colors from '../misc/colors';
import RoundIconBtn from './RoundIconBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useBuckets } from '../contexts/BucketProvider';
import BucketInputModal from './BucketInputModal';

const formatDate = ms => {
  const date = new Date(ms);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hrs = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();

  return `${day}/${month}/${year} - ${hrs}:${min}:${sec}`;
};

const BucketDetail = props => {
  const [bucket, setBucket] = useState(props.route.params.bucket);
  const headerHeight = useHeaderHeight();
  const { setBuckets } = useBuckets();
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const deleteBucket = async () => {
    const result = await AsyncStorage.getItem('buckets');
    let buckets = [];
    if (result !== null) buckets = JSON.parse(result);

    const newBuckets = buckets.filter(n => n.id !== bucket.id);
    setBuckets(newBuckets);
    await AsyncStorage.setItem('buckets', JSON.stringify(newBuckets));
    props.navigation.goBack();
  };

  const displayDeleteAlert = () => {
    Alert.alert(
      'Are You Sure!',
      'This action will delete your bucket permanently!',
      [
        {
          text: 'Delete',
          onPress: deleteBucket,
        },
        {
          text: 'No Thanks',
          onPress: () => console.log('no thanks'),
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const handleUpdate = async (title, desc, time) => {
    const result = await AsyncStorage.getItem('buckets');
    let buckets = [];
    if (result !== null) buckets = JSON.parse(result);

    const newBuckets = buckets.filter(n => {
      if (n.id === bucket.id) {
        n.title = title;
        n.desc = desc;
        n.isUpdated = true;
        n.time = time;

        setBucket(n);
      }
      return n;
    });

    setBuckets(newBuckets);
    await AsyncStorage.setItem('buckets', JSON.stringify(newBuckets));
  };
  const handleOnClose = () => setShowModal(false);

  const openEditModal = () => {
    setIsEdit(true);
    setShowModal(true);
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={[styles.container, { paddingTop: headerHeight }]}
      >
        <Text style={styles.time}>
          {bucket.isUpdated
            ? `Updated At ${formatDate(bucket.time)}`
            : `Created At ${formatDate(bucket.time)}`}
        </Text>
        <Text style={styles.title}>{bucket.title}</Text>
        <Text style={styles.desc}>{bucket.desc}</Text>
      </ScrollView>
      <View style={styles.btnContainer}>
        <RoundIconBtn
          antIconName='delete'
          style={{ backgroundColor: colors.ERROR, marginBottom: 15 }}
          onPress={displayDeleteAlert}
        />
        <RoundIconBtn antIconName='edit' onPress={openEditModal} />
      </View>
      <BucketInputModal
        isEdit={isEdit}
        bucket={bucket}
        onClose={handleOnClose}
        onSubmit={handleUpdate}
        visible={showModal}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 30,
    color: colors.PRIMARY,
    fontWeight: 'bold',
  },
  desc: {
    fontSize: 20,
    opacity: 0.6,
  },
  time: {
    textAlign: 'right',
    fontSize: 12,
    opacity: 0.5,
  },
  btnContainer: {
    position: 'absolute',
    right: 15,
    bottom: 50,
  },
});

export default BucketDetail;
