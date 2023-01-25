import React, {useEffect} from 'react';

import {ActivityIndicator, View} from 'react-native';
import {Text} from 'react-native-paper';

const LoadingPage = props => {
  const LogOut = async () => {
    let token = await AsyncStorage.get('token');
    if (token) {
      props.navigation.replace('Home');
    } else {
      props.navigation.replace('Login');
    }
  };
  useEffect(() => {
    LogOut();
  }, []);

  return (
    <>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{
            fontSize: 26,
            fontWeight: '600',
            color: 'black',
            margin: 'auto',
          }}>
          <ActivityIndicator size="large" />
        </Text>
      </View>
    </>
  );
};

export default LoadingPage;
