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
} from 'react-native';
import colors from '../misc/colors';
import RoundIconBtn from './RoundIconBtn';
import CloseIconBtn from './CloseIconBtn';
import imageMap from '../misc/imageMap';
import { AntDesign } from '@expo/vector-icons';
import IconPickerModal from './IconPickerModal';

const BucketInputModal = ({ visible, onClose, onSubmit, bucket, isEdit }) => {
  const [title, setTitle] = useState('');
  const [goal, setGoal] = useState('');
  const [balance, setBalance] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [icon, setIcon] = useState('');
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
    }
  }, [isEdit]);

  const handleOnChangeText = (text, valueFor) => {
    if (valueFor === 'title') setTitle(text);
    if (valueFor === 'goal') setGoal(text);
    if (valueFor === 'balance') setBalance(text);
    if (valueFor === 'targetDate') setTargetDate(text);
    if (valueFor === 'icon') setIcon(imageMap.icons.house);
  };

  const handleSubmit = () => {
    if (!title.trim() && !goal.trim() && !balance.trim() && !targetDate.trim() && !icon.trim()) return onClose();

    if (isEdit) {
      onSubmit(title, goal, balance, targetDate, icon, Date.now());
    } else {
      onSubmit(title, goal, balance, targetDate, icon);
      setTitle('');
      setGoal('');
      setBalance('');
      setTargetDate('');
      setIcon('');
    }
    onClose();
  };

  const closeModal = () => {
    if (!isEdit) {
      setTitle('');
      setGoal('');
      setBalance('');
      setTargetDate('');
      setIcon('');
    }
    onClose();
  };

  const [IconmodalVisible, setIconModalVisible] = useState(false);
  const handleOpenPicker = () => setIconModalVisible(true);


  return (
    <>
      <Modal visible={visible}>
        <SafeAreaView />
        
        
        <View style={styles.container}>
        <CloseIconBtn
                style={styles.closeBtn}
                antIconName='close'
                onPress={closeModal}
                
              />
        <Text style={styles.modalTitle}>Add New Savings Bucket</Text>
          <TextInput
            value={title}
            onChangeText={text => handleOnChangeText(text, 'title')}
            placeholder='Title'
            style={[styles.input, styles.title]}
          />
          <TextInput
            value={goal}
            placeholder='Goal Amount'
            style={[styles.input, styles.goal]}
            onChangeText={text => handleOnChangeText(text, 'goal')}
          />
          <TextInput
            value={balance}
            placeholder='Current Balance'
            style={[styles.input, styles.goal]}
            onChangeText={text => handleOnChangeText(text, 'balance')}
          />
          <TextInput
            value={targetDate}
            placeholder='Targeted Date'
            style={[styles.input, styles.goal]}
            onChangeText={text => handleOnChangeText(text, 'targetDate')}
          />
          <TextInput
            value={icon}
            placeholder='icon name (icon-example.png)'
            style={[styles.input, styles.goal]}
            onChangeText={text => handleOnChangeText(text, 'icon')}
          />
          <TouchableOpacity onPress={handleOpenPicker}
          >
          <AntDesign name="picture" size={50} color="black" />
          </TouchableOpacity>
          
          <IconPickerModal
          visible={IconmodalVisible}
          closeIconModal={ () => setIconModalVisible(false)}
          /> 

  
          <View style={styles.btnContainer}>
            <RoundIconBtn
              size={30} 
              antIconName='check'
              onPress={handleSubmit}
            />
              <RoundIconBtn
                size={30}
                style={{ marginLeft: 15 }}
                antIconName='close'
                onPress={closeModal}
              />
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

export default BucketInputModal;
