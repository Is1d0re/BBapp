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
  Button,
  FlatList,
  Platform,
} from 'react-native';
import colors from '../misc/colors';
import RoundIconBtn from './RoundIconBtn';
import CloseIconBtn from './CloseIconBtn';
import imageMap from '../misc/imageMap';
import { AntDesign } from '@expo/vector-icons';
import IconPickerModal from './IconPickerModal';
import DatePickerModal from './DatePickerModal';
import {Picker} from '@react-native-picker/picker';
import SwitchSelector from 'react-native-switch-selector';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import DateTimePicker from '@react-native-community/datetimepicker';


const AddTransactionModal = ({ visible, onClose, onSubmit, bucket, isEdit, bucketTitle  }) => {
  const [title, setTitle] = useState('');
  const [goal, setGoal] = useState('');
  const [balance, setBalance] = useState('');
  const [targetDate, setTargetDate] = useState();
  const [icon, setIcon] = useState();
  const [transactions, setTransactions] = useState([]);
  const [month, setMonth] = useState('');
  const [amount, setAmount] = useState('');
  const [pendingTransactions, setPendingTransactions] = useState([]);

  const switchOptions = [
    { label: 'Add', value: '1'},
    { label: 'Subtract', value: '-1'},
  ];

  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const dateString = (selectedDate.toDateString());
  const [show, setShow] = useState(false);

 
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setSelectedDate(currentDate)
  
  };

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
      setSelectedDate(new Date())
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
      onSubmit(balance, transactions, Date.now());
    } else {
    onSubmit(balance, transactions);
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

const [multiplier, setMultiplier] = useState('1')

const addTransaction = () => {
  if (amount ===''){
    alert('please enter an amount')
    return;
    } 
  const transactionID = Date.now();
  const balanceNumber = Number(balance)
  const newBalance = balanceNumber + Number(amount) 
  const transaction = {transactionID, selectedDate, amount, newBalance};
  const updatedTransactions = [transaction, ...transactions];
  // transactions.unshift(JSON.stringify(transaction));
  setTransactions(updatedTransactions);
 
  setBalance(JSON.stringify(newBalance));
  setPendingTransactions([transaction, ...pendingTransactions]);
  setAmount('');
  setSelectedDate(new Date());
 
  
  
};

  return (
      <Modal visible={visible} transparent>
        <SafeAreaView />

        <View style={styles.container}>
          <View style={styles.headerArea}>
              <View style={styles.closeBtnArea}>
                  <CloseIconBtn
                        style={styles.closeBtn}
                        antIconName='close'
                        onPress={closeModal}
                        color = {colors.LIGHT}
                      />
              </View>
              <View style={styles.titleArea}>
                  <Text style={styles.modalTitle}>Add transaction for {bucketTitle}</Text>
              </View>
              
            </View>
            <View style={styles.switchArea}>
                  <SwitchSelector options={switchOptions} fontSize={18} animationDuration={250} selectedColor= {'#024157'} textColor={colors.LIGHT} backgroundColor={'#29728c'} buttonColor={'#96c4d4'} initial={0} onPress={ value => setMultiplier(value)} />
              </View>
          <View style={styles.inputArea} >
              <View style={styles.dateArea}>
                <View style={styles.datePicker}>
                <Text style={styles.label}>Date:</Text>
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={selectedDate}
                        mode='date'
                        is24Hour={true}
                        display="calendar"
                        onChange={onChange}
                        style={{height: 50, width: 130}}
                     />
                </View>
                <View style={styles.amountArea}>
                    <Text style={styles.label}>Amount:</Text>
                    <TextInput
                      value={amount}
                      placeholder='$0.00'
                      style={[styles.amountInput]}
                      onChangeText={text => handleOnChangeText(text, 'amount')}
                      keyboardType='decimal-pad'
                      returnKeyType= 'done'
                
                    />
                </View>
              </View>
          <TextInput
            value={month}
            placeholder='What month?'
            style={[styles.input, styles.goal]}
            onChangeText={text => handleOnChangeText(text, 'month')}
            
          />

          
          


          
          <Button title='add transaction' onPress={addTransaction} />
          </View>
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
                <Text>{item.selectedDate.toDateString()} : {item.amount} </Text>
                
              )}
            />
        <TouchableWithoutFeedback onPress={handleModalClose}>
          <View style={[styles.modalBG, StyleSheet.absoluteFillObject]} />
        </TouchableWithoutFeedback>
      </Modal>
      
  );
};

const styles = StyleSheet.create({
  modalBG: {
    flex: 1,
    zIndex: -1,
    backgroundColor: 'rgba(0,0,0,0.5)',

  },
  container: {
    // paddingHorizontal: 20,
    // paddingTop: 20,
    marginTop: 60,
    borderRadius: 5,
    backgroundColor: colors.LIGHT,
    marginHorizontal: 10,
  },
  headerArea:{
    backgroundColor: colors.PRIMARY,
    height: 90,
    borderTopStartRadius: 5,
    borderTopEndRadius: 5,
    flexDirection: 'column',
    paddingTop: 10,
  },
  closeBtnArea:{
    flexDirection: 'row',
    justifyContent: 'flex-end',
    // backgroundColor: 'black',
    // position: 'absolute',
    // right: 10,
    // top: 10,
  },
closeBtn: {
  
},

  icon: {
    height:50,
    width: 50,
},
titleArea:{
  flexDirection: 'row',
  justifyContent: 'center',
  marginTop: 10,
  flexWrap: 'wrap',
},

  modalTitle:{
    fontSize:22,
    fontWeight: 'bold',
    color: colors.LIGHT,
    flexWrap: 'wrap',
    // marginTop: 10,
    // marginBottom: 20,
    // paddingTop: 10,
    
  },
  switchArea: {
    padding: 10,
    backgroundColor: colors.PRIMARY,
  },
  inputArea: {
    flexDirection: 'column',
  },
  dateArea: {
    justifyContent: 'flex-end',
    paddingHorizontal: 5,
    marginTop: 10,
  },
  datePicker: {
    backgroundColor: colors.LIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.PRIMARY,
  

  },
  label: {
    fontSize: 18,
    opacity: 0.6,
    paddingLeft: 15,
  },
  amountArea: {
    backgroundColor: colors.LIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.PRIMARY,
    marginTop: 15,
    paddingBottom: 15
  },
  amountInput: {
    fontSize: 18,
    color: colors.DARK,
    paddingRight: 15,
  },



  input: {
    borderBottomWidth: 2,
    borderBottomColor: colors.PRIMARY,
    fontSize: 16,
    color: colors.DARK,
  },

  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 15,
  },
});

export default AddTransactionModal;
