import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Text,
  StatusBar,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  TouchableOpacity,
  Image,
  DatePickerIOS,
  Button,
  FlatList,
} from 'react-native';
import colors from '../misc/colors';
import RoundIconBtn from './RoundIconBtn';
import CloseIconBtn from './CloseIconBtn';
import imageMap from '../misc/imageMap';
import { AntDesign } from '@expo/vector-icons';
import IconPickerModal from './IconPickerModal';
import DatePickerModal from './DatePickerModal';

const AddTransactionModal = ({ visible, onClose, onSubmit, bucket, isEdit  }) => {
  const [title, setTitle] = useState('');
  const [goal, setGoal] = useState('');
  const [balance, setBalance] = useState('');
  const [targetDate, setTargetDate] = useState();
  const [icon, setIcon] = useState();
  const [transactions, setTransactions] = useState([]);
  const [month, setMonth] = useState('');
  const [amount, setAmount] = useState('');
  const [pendingTransactions, setPendingTransactions] = useState([]);
  

  const handleModalClose = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (isEdit) {
      setTitle(bucket.title);
      setGoal(bucket.goal);
      setBalance(bucket.balance);
      setTargetDate(bucket.targetDate);
      setIcon(bucket.icon);
      setTransactions(bucket.transactions);
      setMonth('');
      setAmount('');
      setPendingTransactions([]);
    }
  }, [isEdit]);

  const handleOnChangeText = (text, valueFor) => {
    if (valueFor === 'month') setMonth(text);
    if (valueFor === 'amount') setAmount(text);
    
    
  };

 
  const handleSubmit = () => {
    if (!title.trim() && !goal.trim() && !balance.trim() && !targetDate.trim() && !icon.trim() && !transactions.trim()) return onClose();
    if (!pendingTransactions[0]){
        alert('no pending transactions to commit')
        return
    }
    if (isEdit) {
      onSubmit(title, goal, balance, targetDate, icon, transactions, Date.now());
    } else {
    onSubmit(title, goal, balance, targetDate, icon, transactions);
    setTitle('');
    setGoal('');
    setBalance('');
    setTargetDate();
    setIcon();
    setTransactions([]);
    setMonth('');
    setAmount('');
    setPendingTransactions([]);
    }    
    onClose();
  };

  const closeModal = () => {
    if (isEdit) {
      console.log('close modal isedit')
      setTitle('');
      setGoal('');
      setBalance('');
      setTargetDate();
      setIcon();
      setTransactions([]);
      setMonth('');
      setAmount('');
      setPendingTransactions([]);
    }
    onClose();
  };

//   const [IconmodalVisible, setIconModalVisible] = useState(false);
//   const handleOpenPicker = () => setIconModalVisible(true);
//   const handleIconPicked = (pickedicon) => setIcon(pickedicon)

  
const addTransaction = () => {
  if (month ===''){
    alert('please enter a month')
    return;
    } 
  if (amount ===''){
    alert('please enter an amount')
    return;
    } 
  const transactionID = Date.now();
  const transaction = {transactionID, month, amount};
  const updatedTransactions = [...transactions, transaction];
  // transactions.unshift(JSON.stringify(transaction));
  setTransactions(updatedTransactions);
  const balanceNumber = Number(balance)
  const newBalance = balanceNumber + Number(amount) 
  setBalance(JSON.stringify(newBalance));
  // console.log(updatedTransactions);
  setPendingTransactions([...pendingTransactions, transaction]);
  setAmount('');
  setMonth('');
 
  
  
};

  return (
    <>
    {console.log(transactions)}
      <Modal visible={visible}>
        <SafeAreaView />

        <View style={styles.container}>
        <CloseIconBtn
                style={styles.closeBtn}
                antIconName='close'
                onPress={closeModal}
                
              />
          <Text style={styles.modalTitle}>Manage Balance for {title} Bucket!</Text>
          
          <TextInput
            value={month}
            placeholder='What month?'
            style={[styles.input, styles.goal]}
            onChangeText={text => handleOnChangeText(text, 'month')}
            
          />

          <TextInput
            value={amount}
            placeholder='Add or subtract from balance (40 or -40)'
            style={[styles.input, styles.goal]}
            onChangeText={text => handleOnChangeText(text, 'amount')}
            keyboardType='numeric'
            
          />
          


          
          <Button title='add transaction' onPress={addTransaction} />
  
          <View style={styles.btnContainer}>
            <RoundIconBtn
              size={30} 
              antIconName='check'
              onPress={() => {handleSubmit(); setPendingTransactions([])}}
            />
              <RoundIconBtn
                size={30}
                style={{ marginLeft: 15 }}
                antIconName='close'
                onPress={closeModal}
              />
          </View>
          
        </View>
        <FlatList
              data={pendingTransactions}
              keyExtractor={item => item.transactionID.toString()}
              renderItem={({ item }) => (
                <Text>{item.month} : {item.amount} </Text>
                
              )}
            />
        <TouchableWithoutFeedback onPress={handleModalClose}>
          <View style={[styles.modalBG, StyleSheet.absoluteFillObject]} />
        </TouchableWithoutFeedback>
      </Modal>
      </>
  );
};

const styles = StyleSheet.create({
  wrapper:{
    flex: 1,
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    marginTop: 60,
    borderRadius: 30,
    backgroundColor: '#ffe7df',
    marginHorizontal: 10,
  },
  closeBtn:{
    //backgroundColor: 'black',
    position: 'absolute',
    right: 10,
    top: 10,

  },
  icon: {
    height:50,
    width: 50,
},
  modalTitle:{
    fontSize:22,
    fontWeight: 'bold',
    color: '#8daca6',
    marginTop: 10,
    marginBottom: 20,
    paddingTop: 10,
    
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: colors.PRIMARY,
    fontSize: 20,
    color: colors.DARK,
  },
  title: {
    height: 40,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  goal: {
   // height: 100,
  },
  modalBG: {
    flex: 1,
    zIndex: -1,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 15,
  },
});

export default AddTransactionModal;
