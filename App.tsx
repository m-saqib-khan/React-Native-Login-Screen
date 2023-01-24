import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginPage from './Components/LoginPage';
import SignupPage from './Components/SignupPage';
import {StatusBar} from 'react-native';
import HomePage from './Components/HomePage';
import AsyncStorage from '@react-native-async-storage/async-storage';

function App() {
  const [isToken, setIsToken] = useState(false);
  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token || token === '') {
         setIsToken(false);
         return 
      }
      setIsToken(true);
    } catch (error) {
      setIsToken(false);
      console.log(error, 'error');
    }
  };
  useEffect(() => {
    getToken();
  }, []);

  const Stack = createNativeStackNavigator();
  console.log("token",isToken)
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          {isToken ? (
            <Stack.Screen name="Home" component={HomePage} />
          ) : (
            <>
              <Stack.Screen name="Signup" component={SignupPage} />
              <Stack.Screen name="Login" component={LoginPage} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;
