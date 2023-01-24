import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
import {Button, Text, TextInput} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginPage = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    fetch('https://fa84-182-189-124-114.ngrok.io/login', {
      method: 'POST',
      // Adding headers to the request
      headers: {
        'Content-type': 'application/json',
      },

      // Adding body or contents to send
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }) // Converting to JSON
      .then(response => response.json())

      // Displaying results to console
      .then(async data => {
        try {
          console.log(data);
          await AsyncStorage.setItem('token', data.token);
          props.navigation.replace('Home');
        } catch (error) {
          console.log(error, 'error');
        }
      });
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
          LOGIN SCREEN
        </Text>
        {/* </LinearGradient> */}
      </View>
      <View
        style={{
          //   flex: 1,
          backgroundColor: 'white',
          borderWidth: 1,
          borderColor: 'transparent',
          borderRadius: 15,
          marginTop: -20,
          marginLeft: 10,
          marginRight: 10,
          height: 385,
          gap: 15,
        }}>
        <Text
          style={{
            marginTop: 18,
            marginLeft: 18,
            marginRight: 18,
            fontSize: 24,
            color: 'rgba(98, 57, 169, 0.9)',
            fontWeight: '700',
          }}>
          LOGIN
        </Text>

        <TextInput
          value={email}
          onChangeText={email => setEmail(email)}
          label="Username"
          mode="outlined"
          style={{marginTop: 18, marginLeft: 18, marginRight: 18}}
        />
        <TextInput
          value={password}
          onChangeText={password => setPassword(password)}
          label="Password"
          mode="outlined"
          style={{marginTop: 18, marginLeft: 18, marginRight: 18}}
        />
        <TouchableOpacity>
          <Button
            mode="contained"
            style={{marginTop: 18, marginLeft: 18, marginRight: 18}}
            onPress={handleLogin}>
            LOGIN
          </Button>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={{marginTop: 18, marginLeft: 18, marginRight: 18}}
            onPress={() => props.navigation.navigate('Signup')}>
            Don't have an Account? Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default LoginPage;
