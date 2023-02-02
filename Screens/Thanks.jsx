import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
export default function Thanks(props) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.thanks}>Thanks</Text>
        <Text style={styles.description}>
          {' '}
          Thanks for shopping go Back Home
        </Text>
        <Button
          style={styles.button}
          mode="outlined"
          onPress={() => props.navigation.navigate("Home")}>
          {'<-- Back Home'}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    alignSelf: 'center',
    alignItems: 'center',
  },
  thanks: {
    fontSize: 29,
    color:"black"
  },
  description:{
    fontSize:15,
    marginBottom:10
  }
});
