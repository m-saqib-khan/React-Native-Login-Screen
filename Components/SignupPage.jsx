import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import AsyncStorage, {
  useAsyncStorage,
} from '@react-native-async-storage/async-storage';
import axios from 'axios';
import LoadingPage from './LoadingPage';
import { getRequest, postRequest } from '../global/services.jsx';
// import { SIGNUP } from '../global/Constant.js';

const SignupPage = props => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    console.log('Chala signup');
    const payload = {
      name: name,
      email: email,
      password: password,
    };
    try {
      const res =await postRequest("/signup",payload)
      // const res = await axios.post(
      //   'https://0666-119-157-89-171.eu.ngrok.io/signup',
      //   payload,
      // );
      if (res) {
        await AsyncStorage.setItem('token', res.data.token);
        props.navigation.replace('Home');
      } else {
        console.log('asdasd error');
      }
    } catch (error) {
      console.log(error, 'eroasor');
    }
  };
  return (
    <>
      <View
        style={{
          backgroundColor: 'rgba(101, 21, 240, 0.9)',
          height: 150,
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {/* <LinearGradient
        start={{x: 0.0, y: 0.25}}
        end={{x: 0.5, y: 1.0}}
        locations={[0, 0.5, 0.6]}
        colors={['#4c669f', '#3b5998', '#192f6a']}> */}
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            fontSize: 26,
            fontWeight: '800',
          }}>
          CREATE ACCOUNT
        </Text>
        {/* </LinearGradient> */}
      </View>

      <View
        style={{
          backgroundColor: 'white',
          borderWidth: 1,
          borderColor: 'transparent',
          borderRadius: 15,
          marginTop: -20,
          marginLeft: 10,
          marginRight: 10,
          height: 395,
          gap: 12,
        }}>
        <TextInput
          value={name}
          onChangeText={name => setName(name)}
          label="Name"
          mode="outlined"
          style={{marginTop: 18, marginLeft: 18, marginRight: 18}}
        />
        <TextInput
          value={email}
          onChangeText={email => setEmail(email)}
          label="Email"
          mode="outlined"
          style={{marginTop: 18, marginLeft: 18, marginRight: 18}}
        />
        <TextInput
          value={password}
          secureTextEntry={true}
          onChangeText={password => setPassword(password)}
          label="Password"
          mode="outlined"
          style={{marginTop: 18, marginLeft: 18, marginRight: 18}}
        />
        <TouchableOpacity>
          <Button
            mode="contained"
            style={{marginTop: 18, marginLeft: 18, marginRight: 18}}
            onPress={handleSignUp}>
            SIGNUP
          </Button>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={{marginTop: 18, marginLeft: 18, marginRight: 18}}
            onPress={() => props.navigation.navigate('Login')}>
            Already have an Account ?
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SignupPage;
