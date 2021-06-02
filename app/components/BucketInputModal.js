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
import DateTimePicker from '@react-native-community/datetimepicker';
import { Colors } from 'react-native/Libraries/NewAppScreen';


const BucketInputModal = ({ visible, onClose, onSubmit, bucket, isEdit }) => {
  const [title, setTitle] = useState('');
  const [goal, setGoal] = useState('');
  const [balance, setBalance] = useState('');
  const [targetDate, setTargetDate] = useState(JSON.stringify(new Date()));
  const [icon, setIcon] = useState();
  const [transactions, setTransactions] = useState([]);


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
      setSelectedDate(new Date(JSON.parse(bucket.targetDate)))
    }
  }, [isEdit]);

  const handleOnChangeText = (text, valueFor) => {
    if (valueFor === 'title') setTitle(text);
    if (valueFor === 'goal') setGoal(text);
    if (valueFor === 'balance') setBalance(text);
   
    
  };

  const handleCheck = () => {
    if (title === '') {
      alert('must have a title');
      return;
    } 
    if (goal === '') {
      alert('must have a goal');
      return;
    } 
    if (balance === '') {
      alert('must have a balance');
      return;
    } 
    if (typeof icon === 'undefined') {
      alert('you must select an icon')
      return;
    } 
    if (typeof targetDate === 'undefined') {
      alert('you must select a date in the future')
      return;
    }
      handleSubmit();

  };

  const handleSubmit = () => {
    if (!title.trim() && !goal.trim() && !balance.trim() && !targetDate.trim() && !icon.trim()) return onClose();
    
    if (isEdit) {
      onSubmit(title, goal, targetDate, icon, Date.now());
    } else {
      onSubmit(title, goal, balance, targetDate, icon, transactions);
      setTitle('');
      setGoal('');
      setBalance('');
      setTargetDate(JSON.stringify(new Date()));
      setIcon();
      setSelectedDate(new Date());
    }
    onClose();
  };

  const closeModal = () => {
    if (!isEdit) {
      setTitle('');
      setGoal('');
      setBalance('');
      setTargetDate();
      setIcon();
      setSelectedDate(new Date());
    }
    onClose();
  };

  const [IconmodalVisible, setIconModalVisible] = useState(false);
  const handleOpenPicker = () => setIconModalVisible(true);
  const handleIconPicked = (pickedicon) => setIcon(pickedicon)


  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());


 
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setSelectedDate(currentDate)
    setTargetDate(JSON.stringify(currentDate));
    setDate(JSON.stringify(currentDate));
  };



  return (
    <>
      <Modal visible={visible} animationType='slide'>
      <View style={styles.wrapper}>
        <SafeAreaView style={styles.safeArea} />
        <View style={styles.container}>
          <View style= {styles.headerArea}>
            <View style={styles.closeBtnArea}>
                <CloseIconBtn
                    style={styles.closeBtn}
                    antIconName='close'
                    onPress={closeModal}
                    color= {colors.LIGHT}
                
                />
            
                <View style={styles.titleArea}>
                  {(isEdit) ? (
                    <Text style={styles.modalTitle}>Bucket Editor!</Text>
                    ) : <Text style={styles.modalTitle}>Create a Bucket!</Text>
                  } 
                </View>
            
            </View>
          </View>
          <View style={styles.inputArea}>
            <View style={styles.inputItemRow}>
              <View style={styles.inputItemColumn}>
              <Text style={styles.label}>Title:</Text>
                <TextInput
                  value={title}
                  onChangeText={text => handleOnChangeText(text, 'title')}
                  placeholder='Title'
                  style={[styles.input]}
                  returnKeyType= 'done'
                />
              </View>
            </View>
            <View style={styles.inputItemRow}>
              <View style={styles.inputItemColumn}>
                <Text style={styles.label}>Icon:</Text>
                <TouchableOpacity onPress={handleOpenPicker}>
                {icon ? (
                    <Image style={styles.icon} source = {JSON.parse(icon)} />
                  ) : ( <Image style={styles.icon} source = {require('./../../assets/icons/picture.png')} />
                  )}
                  
                </TouchableOpacity>
              
              </View>
            </View>
            <View style={styles.inputItemRow}>
              <View style={styles.inputItemColumn}>
              <Text style={styles.label}>Goal:</Text>
              <TextInput
                  value={goal}
                  placeholder='Goal Amount'
                  style={[styles.input]}
                  onChangeText={text => handleOnChangeText(text, 'goal')}
                  keyboardType = 'numeric'
                  returnKeyType= 'done'
              />
             </View>
            </View>
            <View style={styles.inputItemRow}>
              <View style={styles.inputItemColumn}>
              <Text style={styles.label}>Date:</Text>
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={selectedDate}
                        mode='date'
                        is24Hour={true}
                        display="calendar"
                        onChange={onChange}
                        style={{height: 30, width: 130}}
                     />
                </View>
              </View>
              {!(isEdit)? (
              <View style={styles.inputItemRow}>
                <View style={styles.inputItemColumn}>
                  <Text style={styles.label}>Current Balance:</Text>
                  
                  <TextInput
                    value={balance}
                    placeholder='Current Balance'
                    style={[styles.input  ]}
                    onChangeText={text => handleOnChangeText(text, 'balance')}
                    keyboardType = 'numeric'
                    returnKeyType= 'done'
                  /> 
                </View>
              </View>
              ) : null
            }
            </View>
          
          
         
         {/* {targetDate ? (
          <Text>{(new Date(JSON.parse(targetDate))).toDateString()}</Text>
         ): null
         } */}

          

          <IconPickerModal
          visible={IconmodalVisible}
          closeIconModal={ () => setIconModalVisible(false)}
          handleIconPicked={handleIconPicked}
          /> 
         

  
         <View style={styles.btnContainer}>
            <RoundIconBtn
              size={30} 
              antIconName='check'
              onPress={() => {handleCheck();}}
              style={styles.btn}
              submit = {'submit'}
            />
          </View>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={handleModalClose}>
          <View style={[styles.modalBG, StyleSheet.absoluteFillObject]} />
        </TouchableWithoutFeedback>
      </Modal>
      </>
  );
};

const styles = StyleSheet.create({
  // wrapper:{
  //   flex: 1,
  //   backgroundColor: 'rgba(0,0,0,0.5)',

  // },
  safeArea:{
    backgroundColor: colors.PRIMARY,
  },
  container: {
    backgroundColor: colors.LIGHT,
  },
  closeBtnArea:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: 10,
    paddingBottom: 15,
  },
  closeBtn:{
 
  },
  icon: {
    height:50,
    width: 50,
},
headerArea:{
  backgroundColor: colors.PRIMARY,
  flexDirection: 'column',
  paddingTop: 10,
},
titleArea:{
  flexDirection: 'row',
  justifyContent: 'center',
  flexWrap: 'wrap',
  marginLeft: 20,
},
modalTitle:{
  fontSize:18,
  fontWeight: 'bold',
  color: colors.LIGHT,
  flexWrap: 'wrap',
  
},
inputArea: {
  flexDirection: 'column',
  paddingTop: 25,
},
inputItemRow: {
  justifyContent: 'flex-end',
  paddingHorizontal: 15,
},
inputItemColumn: {
  backgroundColor: colors.LIGHT,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottomWidth: 1,
  borderBottomColor: colors.PRIMARY,
  paddingBottom: 10,
  paddingTop: 10,
},
label: {
  fontSize: 18,
  opacity: 0.6,
  paddingLeft: 15,
},

input: {
  fontSize: 18,
  color: colors.DARK,
  paddingRight: 15,
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
  btn: {
    borderRadius: 5,
    width: '70%',
    
  },
});

export default BucketInputModal;
