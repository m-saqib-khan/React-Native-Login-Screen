import React from 'react';
import {View, Image, Text, StyleSheet,ScrollView,TouchableOpacity} from 'react-native';

export default function Card({data,navigation}) {


    const onPress = () => console.log("click");
  return (<ScrollView>{data.map((product,index)=>(

    <TouchableOpacity key={index} onPressIn={()=>navigation.navigate("Checkout",product)}>
      <View style={style.container} >
      <Text style={style.title}>{product.title}</Text>
      <Image
        style={style.cardImage}
        source={{
            uri: product.image_uri,
        }}
      />
      <Text style={style.detail}>
        Rent Amount = <Text style={style.amount}>{product.amount}$</Text>
      </Text>

      <Text style={style.detail}>
        Security deposit Amount (which is ruturnable) ={' '}
        <Text style={style.amount}>{product.security_deposit}$</Text>
      </Text>
      </View>
    </TouchableOpacity>
  ))}
  </ScrollView>)
}
const style = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 10,
    borderStyle: 'solid',
    borderColor: 'gray',
    // borderWidth:0.5,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical:10,
    backgroundColor: 'white',
  },
  cardImage: {
    height: 220,
  },
  title: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  detail: {
    color: 'black',
  },
  amount: {
    fontSize: 12,
    color: 'black',
    fontWeight: 'bold',
  },
});
