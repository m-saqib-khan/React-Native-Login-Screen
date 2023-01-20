import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {ActivityIndicator} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';

const LoadingPage = () => {
  return (
    <>
      <Text>
        <ActivityIndicator size="large" />
      </Text>
    </>
  );
};

export default LoadingPage;
