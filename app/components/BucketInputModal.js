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
import {AntDesign} from '@expo/vector-icons'
import CloseIconBtn from './CloseIconBtn';

const BucketInputModal = ({ visible, onClose, onSubmit, bucket, isEdit }) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const handleModalClose = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (isEdit) {
      setTitle(bucket.title);
      setDesc(bucket.desc);
    }
  }, [isEdit]);

  const handleOnChangeText = (text, valueFor) => {
    if (valueFor === 'title') setTitle(text);
    if (valueFor === 'desc') setDesc(text);
  };

  const handleSubmit = () => {
    if (!title.trim() && !desc.trim()) return onClose();

    if (isEdit) {
      onSubmit(title, desc, Date.now());
    } else {
      onSubmit(title, desc);
      setTitle('');
      setDesc('');
    }
    onClose();
  };

  const closeModal = () => {
    if (!isEdit) {
      setTitle('');
      setDesc('');
    }
    onClose();
  };

  
  return (
    <>
      <Modal visible={visible} animationType='slide' transparent>
        <SafeAreaView />
        <View style={styles.wrapper}></View>
        
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
            value={desc}
            multiline
            placeholder='Bucket'
            style={[styles.input, styles.desc]}
            onChangeText={text => handleOnChangeText(text, 'desc')}
          />
          <View style={styles.btnContainer}>
            <RoundIconBtn
              size={30}
              antIconName='check'
              onPress={handleSubmit}
            />
            {title.trim() || desc.trim() ? (
              <RoundIconBtn
                size={30}
                style={{ marginLeft: 15 }}
                antIconName='close'
                onPress={closeModal}
              />
            ) : null}
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
    height: '90%',
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
  desc: {
    height: 100,
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
