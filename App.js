import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Intro from './app/screens/Intro';
import BucketScreen from './app/screens/BucketScreen';
import BucketDetail from './app/components/BucketDetail';
import BucketProvider from './app/contexts/BucketProvider';
import colors from './app/misc/colors';


const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState({});
  const [isAppFirstTimeOpen, setIsAppFirstTimeOpen] = useState(false);
  const findUser = async () => {
    const result = await AsyncStorage.getItem('user');

    if (result === null) return setIsAppFirstTimeOpen(true);

    setUser(JSON.parse(result));
    setIsAppFirstTimeOpen(false);
  };

  useEffect(() => {
    findUser();
  }, []);

  
// AsyncStorage.clear()

  const renderBucketScreen = props => <BucketScreen {...props} user={user} />;


  if (isAppFirstTimeOpen) return <Intro onFinish={findUser} />;
  return (
    <NavigationContainer>
      <BucketProvider>
        <Stack.Navigator
          screenOptions={{ headerTitle: '', headerTransparent: true, headerBackTitleStyle: {color: colors.LIGHT}, headerTintColor: colors.LIGHT}}
        >
          <Stack.Screen component={renderBucketScreen} name='BucketScreen' />
          <Stack.Screen component={BucketDetail} name='BucketDetail' />
        </Stack.Navigator>
      </BucketProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});