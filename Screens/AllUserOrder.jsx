import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Header from '../Components/Header';
import Payment from '../Components/Payment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getRequest, postRequest} from '../global/services';
import {CAPTURED, GET_ORDER} from '../global/Constant';

export default function AllUserOrder(props) {
  const {navigation} = props;
  console.log('data', props.route.params);
  const [Tip, setTip] = useState({
    Tip: 0,
    index: 0,
  });
  const [userId, setUserId] = useState('');
  const [Data, setData] = useState([]);

  const getOrders = async () => {
    const data = await getRequest(GET_ORDER);
    setData(data.data);
    console.log('data', data);
  };

  useEffect(() => {
    const id = AsyncStorage.getItem('id');
    setUserId(id);
    getOrders();
  }, []);

  const capturedAmmount = async (index) => {
    const tipAmmount = index == Tip.index ? Tip?.Tip : 0;
    const data = {
      paymentIntent: Data[index].paymentIntent,
      orderID: Data[index].orderID,
      tip: Tip?.Tip,
      amount:Data[index].amount
    };
    const result =await postRequest(CAPTURED, data);
    getOrders();

    Alert.alert("Succes",'Amount paid successfully');
  };
  return (
    <View style={{}}>
      <Header back={true} navigation={navigation}>
        <Text>All User Order</Text>
      </Header>
      {Data.map((value, index) => (
        <View style={style.container}>
          <Text style={style.title}>{value.title}</Text>
          <Text style={style.detail}>
            Rent Amount = <Text style={style.amount}>{value.amount}$</Text>
          </Text>

          <Text style={style.detail}>
            Security deposit ={' '}
            <Text style={style.amount}>{value.securityDeposit}$</Text>
          </Text>
          {value.status === 'Uncaptured' ? (
            <>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={style.detail}>Add Your Tip (if you want) = </Text>
                <TextInput
                  value={Tip[index]}
                  onChangeText={value => {
                    // Tip[index]=Tip[index]+value
                    setTip({index, Tip: value.length ? value : 0});
                  }}
                  label="Tip"
                  mode="outlined"
                  defaultValue={0}
                  placeholder="Tip"
                  style={style.inputFieldsAndButton}
                />
              </View>
              <Text style={style.detail}>
                Total Amount Payable ={' '}
                <Text style={style.amount}>
                  {index == Tip.index
                    ? parseInt(value.amount) + parseInt(Tip?.Tip)
                    : value.amount}
                  $
                </Text>
              </Text>
              <TouchableOpacity
                style={style.loginButtonContainer}
                onPress={() => capturedAmmount(index)}>
                <Text style={style.loginButton}>COMPLETE YOUR ORDER</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={style.detail}>
                Tip = <Text style={style.amount}>{value.tip}$</Text>
              </Text>
              <Text style={style.amount}>
                Total Amount Paid ={' '}
                <Text style={style.amount}>
                  {' '}
                  {parseInt(value?.amount) + parseInt(value?.tip)}$
                </Text>
              </Text>
            </>
          )}
        </View>
      ))}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
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
  inputFieldsAndButton: {
    width: 100,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 40,
  },
  loginButtonContainer: {
    alignSelf: 'center',
    // width:200,
    borderWidth: 0.5,
    padding: 6,
    borderRadius: 10,
    backgroundColor: 'rgba(20, 17, 120,0.1)',
    margin: 10,
  },
  loginButton: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 500,
    borderWidth: 0,
    color: 'rgba(98, 57, 169, 0.9)',
  },
});
