import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-paper';

const HomePage = props => {

  const handleLogut = async () => {
    let token = await AsyncStorage.clear().then(() => {
      props.navigation.navigate('Login');
      console.log(token, 'LOG out');
    });
  };
  return (
    <>
      <View style={{flex:1,justifyContent: 'center', alignItems: 'center'}}>
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
