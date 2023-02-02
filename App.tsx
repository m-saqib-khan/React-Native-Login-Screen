import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginPage from './Screens/LoginPage';
import SignupPage from './Screens/SignupPage';
import HomePage from './Screens/HomePage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingPage from './Screens/LoadingPage';
import {StripeProvider} from '@stripe/stripe-react-native';
import Config from 'react-native-config';
import Thanks from "./Screens/Thanks"
import Checkout from './Screens/Checkout';
import AllUserOrder from './Screens/AllUserOrder';
function App() {
  const [isToken, setIsToken] = useState(false);
  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log(token, 'token');
      if (!token || token === '') {
        setIsToken(false);
        return;
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
  return (
    <StripeProvider
      publishableKey = {Config.PUBLIC_KEY}
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
      // merchantIdentifier="merchant.com.payment_integration" // required for Apple Pay
    >
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="AllOrder" component={AllUserOrder}/>

          <Stack.Screen name="Checkout" component={Checkout} />
          <Stack.Screen name="Thanks" component={Thanks} />
          {/* <Stack.Screen name="Home" component={HomePage} /> */}
          <Stack.Screen name="Signup" component={SignupPage} />

        </Stack.Navigator>
      </NavigationContainer>
    </StripeProvider>
  );
}

export default App;
