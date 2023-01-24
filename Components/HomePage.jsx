import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-paper';
import LoadingPage from './LoadingPage';

const HomePage = props => {
  // const [isLoading, setIsLoading] = useState(false);
  // const tokenCheck = async () => {
  //   const token = await AsyncStorage.getItem('token');
  //   console.log(token,"token home");
  //   if (token) {
  //     setIsLoading(false);
  //   } else {
  //     setIsLoading(true);
  //   }
  // };
  // useEffect(() => {
  //   tokenCheck();
  // }, []);

  const handleLogut = async () => {
    await AsyncStorage.clear().then(() => {
      console.log('token deleted');
      props.navigation.navigate('Login');
    });
  };
  return (
    <>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 26, fontWeight: '600', color: 'black'}}>
            HOME PAGE SCREEN
          </Text>
          <TouchableOpacity>
            <Button
              mode="contained"
              style={{marginTop: 18, marginLeft: 18, marginRight: 18}}
              onPress={handleLogut}>
              LOG OUT
            </Button>
          </TouchableOpacity>
        </View>
    </>
  );
};

export default HomePage;
