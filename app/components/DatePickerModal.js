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
  FlatList,
  Image,
  Button,
  Platform,
} from 'react-native';
import colors from '../misc/colors';
import RoundIconBtn from './RoundIconBtn';
import CloseIconBtn from './CloseIconBtn';
import DateTimePicker from '@react-native-community/datetimepicker';
import xtype from 'xtypejs'



const DatePickerModal = ({visible, closeDateModal, handleDatePicked}) => {
  const [date, setDate] = useState();
  const [selectedDate, setSelectedDate] = useState(new Date());
  
 
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(JSON.stringify(currentDate));
    setSelectedDate(currentDate)
  
  };

  const dateString = (selectedDate.toDateString());
  const todayDate = new Date;
  const diffDates = (date - todayDate);
  const msInMonth = 1000 * 3600 * 24 * 30; 
  const goal = 2000;
  const balance = 100;
  const amountPermMonth = (((goal - balance)/(diffDates/msInMonth)).toFixed(2));
  



  return (
      <Modal visible={visible} animationType='slide'>
          <SafeAreaView />
          
        <View style={styles.wrapper}>
        <CloseIconBtn
                style={styles.closeBtn}
                antIconName='close'
                onPress={closeDateModal}
                
              />
         
         <DateTimePicker
          testID="dateTimePicker"
          value={selectedDate}
          mode='date'
          is24Hour={true}
          display="calendar"
          onChange={onChange}
          minimumDate={todayDate}
        />
        <Button title='done' onPress={() => {closeDateModal(); handleDatePicked(date);}} />
        <Text>Target Date: {dateString} </Text>
        
        
      
        </View>
      </Modal>
  )
};

const styles = StyleSheet.create({
  wrapper:{
    flex: 1,
  },
  icon: {
    height:50,
    width: 50,
    marginRight: 25,
    borderWidth: 1,
    borderColor: 'black',
},
  gridRow: {
      flexDirection: 'row',
      paddingTop: 50,
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    marginTop: 60,
    borderRadius: 30,
    backgroundColor: '#ffe7df',
    marginHorizontal: 10,
    height: '90%',
  },
  closeBtn:{
    //backgroundColor: 'black',
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 1,

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

export default DatePickerModal;
