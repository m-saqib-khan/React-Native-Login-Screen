import React, {useState, useEffect} from 'react';
import {View, Text, Alert, Platform} from 'react-native';
import {
  useStripe,
  useGooglePay,
  GooglePayButton,
  ApplePayButton,
  useApplePay,
} from '@stripe/stripe-react-native';
import {postRequest} from '../global/services.js';
import {GET_PAYMENT_INTEND, ADD_ORDER} from '../global/Constant.js';
import {Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Payment(props) {
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({});
  const [paymentIntent, setPaymentIntent] = useState('');
  const [userId, setUserId] = useState('');
  const {isGooglePaySupported, initGooglePay, presentGooglePay} =
    useGooglePay();

  const {presentApplePay, isApplePaySupported, confirmApplePayPayment} =
    useApplePay();

  useEffect(() => {
    const initlizeGoogle = async () => {
      if (!(await isGooglePaySupported({testEnv: true}))) {
        console.log('Google Pay is not supported.');
        return;
      }
      const data = await initGooglePay({
        testEnv: true,
        merchantName: '<Your merchant name>',
        countryCode: 'US',
        billingAddressConfig: {
          format: 'asdf asdasd asdfa',
          isPhoneNumberRequired: true,
          isRequired: false,
        },
        existingPaymentMethodRequired: false,
        isEmailRequired: true,
      });

      console.log('=========', data);
      if (data.error) {
        Alert.alert(error.code, error.message);
        return;
      }
    };
    initlizeGoogle();
  }, []);

  useEffect(() => {
    const id = AsyncStorage.getItem('id');
    setUserId(id);
  }, []);
  // const { amount, isOldUser, username } = props.route.params;

  const {title, image_uri, amount, security_deposit} = props.params;

  const fetchPaymentSheetParams = async () => {
    // let customer_id = !isOldUser ? 'cus_NErE1qX0q2t088' : null;
    let customer_id = null;
    // console.log(isOldUser, customer_id);
    try {
      const response = await postRequest(GET_PAYMENT_INTEND, {
        item: {price: (amount + security_deposit) * 100},
        customer_id: customer_id,
        // username,
      });
      const {
        paymentIntent,
        ephemeralKey,
        customerID,
        orderID,
        paymentIntentClientSecret,
      } = await response;
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
        paymentIntentClientSecret,
      };
    } catch (e) {
      console.log('\n\n\n ======> \n ', e);
      return {
        paymentIntent: '',
        ephemeralKey: '',
        customer: '',
        paymentIntentClientSecret: '',
      };
    }
  };

  const initializePaymentSheet = async () => {
    const {
      paymentIntent,
      paymentIntentClientSecret,
      ephemeralKey,
      customerID,
      orderID,
      publishableKey,
    } = await fetchPaymentSheetParams();
    console.log('DATA=> ', {
      paymentIntent,
      ephemeralKey,
      customerID,
      orderID,
      paymentIntentClientSecret,
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
      title: title,
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

  const pay = async () => {
    try {
      const clientSecret = params.paymentIntentClientSecret;

      // const { error } = await presentGooglePay({
      //   clientSecret,
      //   forSetupIntent: false,
      // });
      console.log((amount + security_deposit).toString(), 'ammount');
      let price = amount + security_deposit;
      const res = await presentApplePay({
        cartItems: [
          {
            label: 'Example item name',
            amount: price.toString(),
            paymentType: 'Immediate',
          },
        ],
        country: 'US',
        currency: 'USD',
        // clientSecret,
        // shippingMethods: [
        //   {
        //     amount: '20.00',
        //     identifier: 'DPS',
        //     label: 'Courier',
        //     detail: 'Delivery',
        //   },
        // ],
        // requiredShippingAddressFields: ['emailAddress', 'phoneNumber'],
        // requiredBillingContactFields: ['phoneNumber', 'name'],
        // forSetupIntent: false,
      });
      console.log('res', res);
      console.log('res2', clientSecret);

      const res2 = await confirmApplePayPayment(clientSecret);
      console.log('res2', res2);
      if (res.error) {
        Alert.alert(res.error.code, res.error.message);
        // Update UI to prompt user to retry payment (and possibly another payment method)
        return;
      }

      Alert.alert('Success', 'The payment was confirmed successfully.');
    } catch (e) {
      console.log('============err', e);
    }
  };

  return (
    <View
      style={{flex: 1, justifyContent: 'flex-end', backgroundColor: '#fff'}}>
      {loading && (
        <View style={{justifyContent: 'flex-end', paddingHorizontal: 90}}>
          {/* */}
          {isApplePaySupported || Platform.OS == 'ios' ? (
            <ApplePayButton
              onPress={pay}
              type="plain"
              buttonStyle="black"
              borderRadius={4}
              style={{
                width: '100%',
                height: 50,
              }}
            />
          ) : (
            <GooglePayButton
              type="standard"
              onPress={pay}
              style={{
                width: '100%',
                height: 50,
                alignSelf: 'center',
              }}
            />
          )}
        </View>
      )}
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
