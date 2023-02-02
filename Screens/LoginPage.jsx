import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,Button, Text, TextInput,Alert
} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import {Button, Text, TextInput} from 'react-native-paper';
import AsyncStorage, {
  useAsyncStorage,
} from '@react-native-async-storage/async-storage';
import axios from 'axios';
import LoadingPage from './LoadingPage';
import { getRequest, postRequest } from '../global/services.js';
import { SIGNIN } from '../global/Constant.js';

const LoginPage = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async () => {
    const payload = {
      email: email,
      password: password,
    };
    try {
      const res =await postRequest(SIGNIN,payload)
      console.log(res, 'response');
      if (res.succes) {
        // await AsyncStorage.setItem('token', res.data.token);
        await AsyncStorage.setItem('id', res.id);
        props.navigation.replace('Home');
      } else {
        console.log('asdasd error ');
        throw (res.error)
      }
    } catch (error) {
      console.log(error, 'eroorr');
      Alert.alert("Error",error)
      setEmail("")
      setPassword("")
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
          style={styles.headerText}>
          LOGIN SCREEN
        </Text>
        {/* </LinearGradient> */}
      </View>

      <View
        style={styles.mainContainer}>
        <Text
          style={styles.mainContainerText}>
          LOGIN
        </Text>

        <TextInput
          value={email}
          onChangeText={email => setEmail(email)}
          label="Username"
          mode="outlined"
          placeholder='Useremail'
          style={styles.inputFieldsAndButton}
        />
        <TextInput
          value={password}
          onChangeText={password => setPassword(password)}
          label="Password"
          mode="outlined"
          placeholder='Password'
          secureTextEntry={true}
          style={styles.inputFieldsAndButton}
        />
        <TouchableOpacity style={styles.loginButtonContainer}
            onPress={handleLogin}>
            <Text style={styles.loginButton}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={styles.askQues}
            onPress={() => props.navigation.navigate('Signup')}>
            Don't have an Account? Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  headerContainer:{
    backgroundColor: 'rgba(101, 21, 240, 0.9)',
    height: 150,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText:{
    textAlign: 'center',
    color: 'white',
    fontSize: 26,
    fontWeight: '800',
  },
  mainContainer:{
    //   flex: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 15,
    marginTop: -20,
    marginLeft: 10,
    marginRight: 10,
    height: 360,
    gap: 15,
  },
  mainContainerText:{
    marginTop: 18,
    marginLeft: 18,
    marginRight: 18,
    fontSize: 24,
    color: 'rgba(98, 57, 169, 0.9)',
    fontWeight: '700',
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
    alignSelf:"center",
    width:200,
    borderWidth:0.5,
    padding:10,
    borderRadius:10,
    backgroundColor:"rgba(20, 17, 120,0.1)"

  },
  loginButton:{
    textAlign:"center",
    fontSize:20,
    fontWeight:500,
    borderWidth:0,
    color:"rgba(98, 57, 169, 0.9)"
  },
  askQues:{
    marginTop:5,
    marginLeft:25,
    marginRight:18
  }
})
