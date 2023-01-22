import React, {useEffect} from 'react';

import {ActivityIndicator} from 'react-native';
import {Text} from 'react-native-paper';

const LoadingPage = () => {
  useEffect(async () => {
    let token = await AsyncStorage.get('token');
    if (token) {
      props.navigation.replace('Home');
    } else {
      props.navigation.replace('Login');
    }
  }, []);

  return (
    <>
      <Text>
        <ActivityIndicator size="large" />
      </Text>
    </>
  );
};

export default LoadingPage;
