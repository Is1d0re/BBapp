import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Alert, Image, FlatList, SafeAreaView, TouchableWithoutFeedback, Keyboard, } from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';
import colors from '../misc/colors';
import RoundIconBtn from './RoundIconBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useBuckets } from '../contexts/BucketProvider';
import BucketInputModal from './BucketInputModal';
import AddTransactionModal from './AddTransactionModal';
import Transaction from './Transaction';

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


  const handleUpdate = async (title, goal, balance, targetDate, icon, transactions, time) => {
    console.log('made it to update')
    const result = await AsyncStorage.getItem('buckets');
    let buckets = [];
    if (result !== null) buckets = JSON.parse(result);

    const newBuckets = buckets.filter(n => {
      if (n.id === bucket.id) {
        n.title = title;
        n.goal = goal;
        n.balance = balance;
        n.targetDate = targetDate;
        n.icon = icon;
        n.isUpdated = true;
        n.time = time;
        n.transactions = transactions;

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
  const [TransactionmodalVisible, setTransactionModalVisible] = useState(false);
  const openTransactionModal = () => {
    setIsEdit(true);
    setTransactionModalVisible(true);
  };
  const handleTransactionOnClose = () => setTransactionModalVisible(false);

  const targetDateObject = new Date(JSON.parse(bucket.targetDate));
  const goalNumber = Number(bucket.goal);
  const balanceNumber = Number(bucket.balance);
  const todayDate = new Date;
  const diffDates = (targetDateObject - todayDate);
  const msInMonth = 1000 * 3600 * 24 * 30; 
  const amountPermMonth = Math.round((goalNumber - balanceNumber)/(diffDates/msInMonth));
  const data = bucket.transactions

  

  return (
    <>
    <SafeAreaView style={styles.safeArea}>
      
        
        </SafeAreaView>
        <View
        style={styles.bucketDetails}
      >
        

        <Text style={styles.time}>
          {bucket.isUpdated
            ? `Updated At ${formatDate(bucket.time)}`
            : `Created At ${formatDate(bucket.time)}`}
        </Text>
        <View style={styles.bucketTitle} >
        <Image style={styles.icon} source = {JSON.parse(bucket.icon)} /> 
        <Text style={styles.title}>{bucket.title}</Text>
        </View>
        <View style={styles.bucketInfo} >
          <View style={styles.bucketInfoColumns}>
            <Text style={styles.metric}>Goal</Text>
            <Text style={styles.value}>${bucket.goal}</Text>
          </View>
          <View style={styles.bucketInfoColumns}>
            <Text style={styles.metric}>Balance</Text>
            <Text style={styles.value}>${bucket.balance}</Text>
          </View>
          <View style={styles.bucketInfoColumns}>
            <Text style={styles.metric}>Target Date</Text>
            <Text style={styles.value}>{(targetDateObject).toDateString()}</Text>
          </View>
        </View>
        <View style={styles.bucketInfo}>
        <View style={styles.bucketInfoColumns}>
            <Text style={styles.metric}>Months until your date:</Text>
            <Text style={styles.metric}>You need to save:</Text>
        </View>
        <View style={styles.bucketInfoColumns}>
            <Text style={styles.value}>{(diffDates/msInMonth).toFixed(2)}</Text>
            <Text style={styles.value}>${amountPermMonth} per Month </Text>
        </View>
      </View>
      </View>
      <View style = {styles.transactions}>
        <Text style= {styles.transactionsTitle}>Transaction History</Text>
      {bucket.transactions[0] ? ( 
      <FlatList
              data={data}
              keyExtractor={item => item.transactionID.toString()}
              renderItem={({ item }) => (
                <Transaction item={item}/>
                
              )} 
             />) : <Text>You have not made any transactions</Text>
      }
      </View>
          
      <View style={styles.btnContainer}>
      <RoundIconBtn antIconName='wallet' 
          onPress={openTransactionModal} 
          style={{marginBottom: 15 }}
          />

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
      <AddTransactionModal
        isEdit={isEdit}
        bucket={bucket}
        onClose={handleTransactionOnClose}
        onSubmit={handleUpdate}
        visible={TransactionmodalVisible}
        
      />
      
    </>
  );
};

const styles = StyleSheet.create({
  safeArea:{
    backgroundColor: colors.PRIMARY,
    height: 100,
  },
  bucketDetails: {
    // flex: 1,
    padding: 15,
    backgroundColor: colors.LIGHT,
    paddingTop: 5,
  },
  bucketTitle: {
    marginTop: 10,
    flexDirection: 'row',
    backgroundColor: colors.LIGHT,
    alignItems: 'baseline',
    
  },
  bucketInfo: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: colors.LIGHT,
    // flexWrap: 'wrap',
    flexDirection: 'row',
  },
  bucketInfoColumns: {
    flexDirection: 'column',
    marginRight: 40,
  },
  icon: {
    height:50,
    width: 50,
    //marginRight: 25,
},
  title: {
    fontSize: 30,
    color: colors.PRIMARY,
    fontWeight: 'bold',
    marginLeft: 50,
    justifyContent: 'center',
  },
  metric: {
    fontSize: 16,
    opacity: 0.6,
  },
  value: {
    fontSize: 16,
    color: colors.DARK
  },
  time: {
    textAlign: 'right',
    fontSize: 12,
    opacity: 0.5,
    paddingTop: 10,
  },
  transactions: {
    borderRadius: 10,
    backgroundColor: colors.LIGHT,
    
  },
  transactionsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    paddingHorizontal: 15,
  },
  btnContainer: {
    position: 'absolute',
    right: 15,
    bottom: 50,
  },
});

export default BucketDetail;
