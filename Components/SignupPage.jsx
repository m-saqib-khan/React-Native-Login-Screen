import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignupPage = props => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSignUp = () => {
    fetch('http://localhost:3000/signup', {
      method: 'POST',
      // Adding headers to the request
      headers: {
        'Content-type': 'application/json',
      },

      // Adding body or contents to send
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    }) // Converting to JSON
      .then(response => response.json())

      // Displaying results to console
      .then(async data => {
        try {
          console.log(data);
          let token = await AsyncStorage.setItem('token', data.token);
          console.log(token,"ASddsa")
          props.navigation.replace("Home")
        } catch (error) {
          console.log(error, 'errasor');
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
        {/* <Text
          style={{
            marginTop: 18,
            marginLeft: 18,
            marginRight: 18,
            fontSize: 18,
          }}>
          Create New Account
        </Text> */}

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
