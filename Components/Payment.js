import React, {useState, useEffect} from 'react';
import {View, Text, Alert} from 'react-native';
import {useStripe} from '@stripe/stripe-react-native';
import { postRequest} from '../global/services.js';
import {GET_PAYMENT_INTEND, ADD_ORDER} from '../global/Constant.js';
import {Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Payment(props) {
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({});
  const [paymentIntent, setPaymentIntent] = useState('');
  const [userId,setUserId]=useState('')
  useEffect(()=>{
const id=AsyncStorage.getItem("id")
setUserId(id)
  },[])
  // const { amount, isOldUser, username } = props.route.params;
 
  const { title, image_uri, amount, security_deposit } = props.params;

  const fetchPaymentSheetParams = async () => {
    // let customer_id = !isOldUser ? 'cus_NErE1qX0q2t088' : null;
    let customer_id = null

    // console.log(isOldUser, customer_id);
    try {
      const response = await postRequest(GET_PAYMENT_INTEND, {
        item: {price: (amount+security_deposit) * 100},
        customer_id: customer_id,
        // username,
      });
      console.log('MZK', response, 'end');
      const {paymentIntent, ephemeralKey, customerID, orderID,paymentIntentClientSecret} = await response;
      setParams({
        orderID,
        customerID,
        paymentIntent: paymentIntent,
        paymentIntentClientSecret,
      });
      return {
        paymentIntent,
        ephemeralKey,
        orderID,
        customerID,
        paymentIntentClientSecret
      };
    } catch (e) {
      console.log('\n\n\n ======> \n ', e);
      return {
        paymentIntent: '',
        ephemeralKey: '',
        customer: '',
        paymentIntentClientSecret:""
      };
    }
  };

  const initializePaymentSheet = async () => {
    const {paymentIntent, paymentIntentClientSecret,ephemeralKey, customerID, orderID, publishableKey} =
      await fetchPaymentSheetParams();
    console.log('DATA=> ', {
      paymentIntent,
      ephemeralKey,
      customerID,
      orderID,
      paymentIntentClientSecret
    });
    setPaymentIntent(paymentIntent);
    const {error} = await initPaymentSheet({
      customerId: customerID,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntentClientSecret,
      merchantDisplayName: 'Zeeshan Khan',
      customFlow: false,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      // allowsDelayedPaymentMethods: true,
    });
    // customerId: customer,
    // customerEphemeralKeySecret: ephemeralKey,
    // paymentIntentClientSecret: paymentIntent,
    // customFlow: false,
    // merchantDisplayName: 'Example Inc.',
    // style: 'alwaysDark',
    if (!error) {
      setLoading(true);
    }
  };
  const saveDataToDb = async ({amount, username}) => {
    console.log('params', params);
    const response = await postRequest(ADD_ORDER, {
      title:title,
      amount,
      customerID: params.customerID,
      orderID: params.orderID,
      paymentIntent: paymentIntent,
      securityDeposit: security_deposit,
      userId,
    });
    Alert.alert(`Payment security deposit successfully`);
    props.navigation.navigate('Thanks');

  };

  const openPaymentSheet = async () => {
    console.log('ress');
    const {error} = await presentPaymentSheet();
    if (error) {
      Alert.alert(`Payment Error: ${error.code}`, error.message);
    } else {
      saveDataToDb({amount});
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  return (
    <View
      style={{flex: 1, justifyContent: 'flex-end', backgroundColor: '#fff'}}>
      <Button
        mode="contained"
        disabled={!loading}
        style={{width: 200, alignSelf: 'center', marginVertical: 20}}
        title="BOOK"
        onPress={openPaymentSheet}>
        <Text>CHECKOUT</Text>
      </Button>
    </View>
  );
}
