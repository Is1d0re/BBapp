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
} from 'react-native';
import colors from '../misc/colors';
import RoundIconBtn from './RoundIconBtn';
import CloseIconBtn from './CloseIconBtn';
import imageMap from '../misc/imageMap';



const IconPickerModal = ({visible, closeIconModal, handleIconPicked}) => {
    const [selectedIcon, setSelectedIcon] = useState(null);
    
    const Icon = ({ item, onPress}) => (
        <TouchableOpacity onPress={onPress} style={styles.icon}>
          <Image style={styles.icon} source = {JSON.parse(item.path)} />
        </TouchableOpacity>
      );

    const renderIcon = ({ item }) => {
      return (
        <Icon
          item={item}
          onPress={() => {setSelectedIcon(item.path); closeIconModal(); handleIconPicked(item.path)}}
          
        />
      );
    };
  return (
      <Modal visible={visible} animationType='slide'>
          <SafeAreaView />
          <Text>{selectedIcon}</Text>
          
        <View style={styles.wrapper}>
        <CloseIconBtn
                style={styles.closeBtn}
                antIconName='close'
                onPress={closeIconModal}
                
              />
         <FlatList
        data={imageMap}
        renderItem={renderIcon}
        keyExtractor={(item) => item.name}
        
      />
        
        
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

export default IconPickerModal;
