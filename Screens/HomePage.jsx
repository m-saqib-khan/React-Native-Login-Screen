import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-paper';
import Payment from '../Components/Payment';
import Header from '../Components/Header';
import Card from '../Components/Card';

const HomePage = props => {
  const {navigation} = props;
  const data=[
    {
      title:"Rent a Bike",
      amount:5,
      security_deposit:50,
      image_uri:"https://motorcycleshop.pk/341-home_default/moto-guzzi-v7-iii-stone-price-in-pakistan-rating-reviews-and-pictures.jpg",
    },
    {
      title:"Buy a House",
      amount:50,
      security_deposit:500,
      image_uri:"https://indianewengland.com/wp-content/uploads/2016/04/Home-iage.png",
    },

  ]
  return (
    <>
      <View style={{flex: 1}}>
        <Header navigation={navigation}>
          <Text>HOME PAGE SCREEN</Text>
        </Header>
        {/* <Payment/> */}
        <Card data={data} navigation={props.navigation}/>
        <Button
        mode="contained"
        style={{width: 200, alignSelf: 'center', marginVertical: 10}}
        title="BOOK"
        onPress={()=>navigation.navigate("AllOrder")}>
        <Text>YOUR ORDERS</Text>
      </Button>
      </View>
    </>
  );
};

export default HomePage;
