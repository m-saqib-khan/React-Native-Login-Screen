import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
export default function Header({back, children}) {
  const navigation = useNavigation();
  const handleLogut = async () => {
    try {
      console.log('chlal');
      await AsyncStorage.clear().then(() => {
        console.log('token deleted');
        navigation.navigate('Login');
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        alignItems: 'center',
        paddingTop: 5,
      }}>
        <View
        style={{
          flexDirection:"row",
        alignItems: 'center',
        }}>
    {back &&  <TouchableOpacity
        title="Back"
        style={{paddingRight:10}}
        onPress={() => {
          navigation.goBack();
        }}>
        <Image
          source={require('../assets/back.png')}
          style={{height: 20, width: 20}}
        />
      </TouchableOpacity>}
      <Text style={{fontSize: 20, fontWeight: '600', color: 'black'}}>
        {children}
      </Text>
      </View>
      <TouchableOpacity>
        <Button mode="contained" style={{}} onPress={handleLogut}>
          <Text>LOG OUT</Text>
        </Button>
      </TouchableOpacity>
    </View>
  );
}
