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
  const [balance, setBalance] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState('');
  const [pendingTransactions, setPendingTransactions] = useState([]);

  const switchOptions = [
    { label: 'Add', value: '1'},
    { label: 'Subtract', value: '-1'},
  ];

  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(JSON.stringify(new Date()));
  const [selectedDateObject, setSelectedDateObject] = useState(new Date())
  const [show, setShow] = useState(false);
 
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setSelectedDate(JSON.stringify(currentDate));
    setSelectedDateObject(currentDate);
  
  };

  const handleModalClose = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (isEdit) {
      setTitle(bucket.title);
      setBalance(bucket.balance);
      setTransactions(bucket.transactions);
      setAmount('');
      setPendingTransactions([]);
      setSelectedDate(JSON.stringify(new Date()))
      setMultiplier('1')
    }
  }, [isEdit]);

  const handleOnChangeText = (text, valueFor) => {
    if (valueFor === 'amount') setAmount(text);
  };

 
  const handleSubmit = () => {
    if (amount ===''){
      alert('please enter an amount')
      return;
      } 
    if (multiplier === '-1'){
      const negativeAmount = Number(amount) * -1
      setAmount(negativeAmount.toString())
      const transactionID = Date.now();
      const balanceNumber = Number(balance)
      const newBalance = balanceNumber + Number(negativeAmount) 
      const transaction = {transactionID, selectedDate, amount, newBalance, multiplier};
      const updatedTransactions = [transaction, ...transactions];
      transactions.unshift(transaction);
      // setTransactions(updatedTransactions);  
      setBalance(JSON.stringify(newBalance));
      setPendingTransactions([transaction, ...pendingTransactions]);
      setAmount('');
      setSelectedDate(JSON.stringify(new Date()));  
      setMultiplier('1')
      onSubmit(newBalance, updatedTransactions, Date.now());
      onClose();
    } else {
      const transactionID = Date.now();
      const balanceNumber = Number(balance)
      const newBalance = balanceNumber + Number(amount) 
      const transaction = {transactionID, selectedDate, amount, newBalance, multiplier};
      const updatedTransactions = [transaction, ...transactions];
      transactions.unshift(transaction);
      // setTransactions(updatedTransactions);
      setBalance(JSON.stringify(newBalance));
      setPendingTransactions([transaction, ...pendingTransactions]);
      setAmount('');
      setSelectedDate(JSON.stringify(new Date())); 
      setMultiplier('1');
      setSelectedDateObject(new Date());
      onSubmit(newBalance, updatedTransactions, Date.now()); 
      onClose();
    };

  };

  const closeModal = () => {
    if (isEdit) {
      setTitle('');
      setBalance('');
      setTransactions([]);
      setAmount('');
      setPendingTransactions([]);
      setSelectedDateObject(new Date());
    }
    onClose();
  };


const [multiplier, setMultiplier] = useState('1')


  return (
      <Modal visible={visible} transparent>
        <SafeAreaView style={styles.safeArea} />

        <View style={styles.container}>
          <View style={styles.headerArea}>
              <View style={styles.closeBtnArea}>
                  <CloseIconBtn
                        style={styles.closeBtn}
                        antIconName='close'
                        onPress={closeModal}
                        color = {colors.LIGHT}
                      />
                      <View style={styles.titleArea}>
                           <Text style={styles.modalTitle}>Add transaction for {bucketTitle}</Text>
                      </View>
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
                        value={selectedDateObject}
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
            </View>
          <View style={styles.btnContainer}>
            <RoundIconBtn
              size={30} 
              antIconName='check'
              onPress={() => {handleSubmit(); setPendingTransactions([])}}
              style={styles.btn}
              submit = {'submit'}
            />
          </View>
        </View>
    
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
    backgroundColor: colors.LIGHT,

  },
  safeArea:{
    backgroundColor: colors.PRIMARY,
  },
  container: {
    borderRadius: 5,
    backgroundColor: colors.LIGHT,
  },
  headerArea:{
    backgroundColor: colors.PRIMARY,
    flexDirection: 'column',
    paddingTop: 10,
  },
  closeBtnArea:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: 10,
  },
closeBtn: {
  
},

btn: {
  borderRadius: 5,
  width: '70%',
  
},
titleArea:{
  flexDirection: 'row',
  justifyContent: 'center',
  flexWrap: 'wrap',
  marginLeft: 10,
  flexShrink: 1,

},
  modalTitle:{
    fontSize:22,
    fontWeight: 'bold',
    color: colors.LIGHT,
  },
  switchArea: {
    padding: 15,
    paddingTop: 25,
    backgroundColor: colors.PRIMARY,
  },
  inputArea: {
    flexDirection: 'column',
  },
  dateArea: {
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
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
    justifyContent: 'space-evenly',
    paddingVertical: 30,
  },
});

export default AddTransactionModal;
