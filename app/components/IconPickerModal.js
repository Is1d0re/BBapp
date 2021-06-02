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
    
    const Icon = ({ item, onPress}) => (
        <TouchableOpacity onPress={onPress} style={styles.icon}>
          <Image style={styles.icon} source = {JSON.parse(item.path)} />
        </TouchableOpacity>
      );

    const renderIcon = ({ item }) => {
      return (
        <Icon
          item={item}
          onPress={() => {closeIconModal(); handleIconPicked(item.path)}}
          
        />
      );
    };
  return (
      <Modal visible={visible} animationType='slide' transparent>
        <SafeAreaView />
        <View style={styles.wrapper}>
        <View style={styles.container}>
          <View style= {styles.headerArea}>
            
            <View style={styles.closeBtnArea}>
                <CloseIconBtn
                    style={styles.closeBtn}
                    antIconName='close'
                    onPress={closeIconModal}
                    color= {colors.LIGHT}
                />
                <View style={styles.titleArea}>
                    <Text style={styles.modalTitle}>Choose an Icon</Text>
                </View>
            </View>
          </View>
          <View style={styles.inputArea}>
            <View style={styles.inputItemRow}>
              <FlatList
              data={imageMap}
              renderItem={renderIcon}
              keyExtractor={(item) => item.name}
              numColumns={4}
              />
            </View>
          </View>
      </View>
      </View>
      </Modal>
  )
};

const styles = StyleSheet.create({
  wrapper:{
    flex: 1,
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
    borderTopStartRadius: 5,
    borderTopEndRadius: 5,
    flexDirection: 'column',
    paddingTop: 10,
    justifyContent: 'space-evenly'

  },
  closeBtnArea:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: 10,
    
    // backgroundColor: 'black',
    // position: 'absolute',
    // right: 10,
    // top: 10,
  },
  icon: {
    height:50,
    width: 50,
    marginRight: 15,
    marginBottom: 15,
    // borderWidth: .5,
    // borderColor: 'gray',
  
},
  closeBtn:{
    //backgroundColor: 'black',
    // position: 'absolute',
    // right: 10,
    // top: 10,
    // zIndex: 1,

  },
  titleArea:{
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginLeft: 10,
  },
  modalTitle:{
    fontSize:22,
    fontWeight: 'bold',
    color: colors.LIGHT,
    flexWrap: 'wrap',
    marginBottom: 20,
    marginLeft: 10,
  
    
  },
  inputArea: {
    flexDirection: 'row',
    paddingTop: 25,
    paddingHorizontal: 20,
    justifyContent: 'center'
  },

});

export default IconPickerModal;
