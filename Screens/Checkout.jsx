import React from 'react';
import {View, Text, StyleSheet,Image} from 'react-native';
import Header from '../Components/Header';
import Payment from '../Components/Payment';

export default function Checkout(props) {
  const {navigation} = props;
  const { title, image_uri, amount, security_deposit } = props.route.params;
  console.log("data",props.route.params)

  return (
    <View style={{flex:1}}>
      <Header back={true} navigation={navigation}>
        <Text>CHECKOUT</Text>
      </Header>
      <View style={style.container} >
      <Text style={style.title}>{title}</Text>
      <Image
        style={style.cardImage}
        source={{
            uri: image_uri,
        }}
      />
      <Text style={style.detail}>
        Rent Amount = <Text style={style.amount}>{amount}$</Text>
      </Text>

      <Text style={style.detail}>
        Security deposit ={' '}
        <Text style={style.amount}>{security_deposit}$</Text>
      </Text>
      <Text style={style.detail}>
        Total Amount ={' '}
        <Text style={style.amount}>{security_deposit+amount}$</Text>
      </Text>
      </View>
      <Payment navigation={navigation} params={props.route.params}/>
    </View>
  );
}

const style = StyleSheet.create({
    container: {
      marginTop: 20,
      paddingHorizontal: 20,
      paddingVertical:10,
      backgroundColor: 'white',
    },
    cardImage: {
      height: 220,
    },
    title: {
      fontSize: 30,
      color: 'black',
      fontWeight: 'bold',
    },
    detail: {
      color: 'black',
      fontSize: 17,

    },
    amount: {
      fontSize: 17,
      color: 'black',
      fontWeight: 'bold',
    },
  });
  
