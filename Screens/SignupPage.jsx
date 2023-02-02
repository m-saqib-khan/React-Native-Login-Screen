import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet,Text, TextInput} from 'react-native';
// import {Button, Text, TextInput} from 'react-native-paper';
import AsyncStorage, {
  useAsyncStorage,
} from '@react-native-async-storage/async-storage';
import axios from 'axios';
import LoadingPage from './LoadingPage';
import { getRequest, postRequest } from '../global/services.js';
import { SIGNUP } from '../global/Constant.js';

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
      const res =await postRequest(SIGNUP,payload)
      console.log("res",res)
      if (res) {
        // await AsyncStorage.setItem('token', res.data.token);
        await AsyncStorage.setItem('id', res.data.id);
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
        style={styles.headerContainer}>
        {/* <LinearGradient
        start={{x: 0.0, y: 0.25}}
        end={{x: 0.5, y: 1.0}}
        locations={[0, 0.5, 0.6]}
        colors={['#4c669f', '#3b5998', '#192f6a']}> */}
        <Text
          style={styles.headerContainerText}>
          CREATE ACCOUNT
        </Text>
        {/* </LinearGradient> */}
      </View>

      <View
        style={styles.mainContainer}>
        <TextInput
          value={name}
          onChangeText={name => setName(name)}
          label="Name"
          placeholder='Name'
          mode="outlined"
          style={styles.inputFieldsAndButton}
        />
        <TextInput
          value={email}
          onChangeText={email => setEmail(email)}
          label="Email"
          placeholder='Email'
          style={styles.inputFieldsAndButton}
          mode="outlined"
        />
        <TextInput
          value={password}
          secureTextEntry={true}
          onChangeText={password => setPassword(password)}
          label="Password"
          placeholder='Password'
          mode="outlined"
          style={styles.inputFieldsAndButton}
        />
        <TouchableOpacity style={styles.loginButtonContainer}
            onPress={handleSignUp}>
            <Text style={styles.loginButton}>SIGNUP</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
          style={styles.askQues}
            onPress={() => props.navigation.navigate('Login')}>
            Already have an Account ?
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SignupPage;


const styles = StyleSheet.create({
  headerContainer:{
    backgroundColor: 'rgba(101, 21, 240, 0.9)',
    height: 150,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainerText:{
    textAlign: 'center',
    color: 'white',
    fontSize: 26,
    fontWeight: '800',
  },
  mainContainer:{
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 15,
    marginTop: -20,
    marginLeft: 10,
    marginRight: 10,
    height: 365,
    gap: 12,
  },
 inputFieldsAndButton:{
  marginTop: 18,
   marginLeft: 18,
    marginRight: 18,
  borderWidth:1,
  borderRadius:10,
  padding:10,
},
 loginButtonContainer:{
  marginTop:18,
  marginLeft:18,
  marginRight:18,
  alignSelf:"center",
  width:200,
  borderWidth:0.5,
  padding:10,
  borderRadius:10,
  backgroundColor:"rgba(20, 17, 120,0.1)",

},
loginButton:{
  alignSelf:"center",
  fontSize:20,
  fontWeight:500,
  borderWidth:0,
  color:"rgba(98, 57, 169, 0.9)",
},
askQues:{
  marginTop:5,
  marginLeft:25,
  marginRight:18
}
})