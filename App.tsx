import React from 'react';
import { StyleSheet, View } from 'react-native';
import Home from './src/screens/Home';

// Virgil SDK
import AsyncStorage from '@react-native-community/async-storage';
import { EThree } from '@virgilsecurity/e3kit-native';
import { ipAddress } from './src/endPoints/index';

/**
 * Method to get a JSON WEB TOKEN from the backend, the idententy is being encoded so that
 * it can be used to send to the backend as a get request
 *
 * @param identity - email address
 */
const getTokenFactory = (identity) => {
  return () =>
    fetch(`http://${ipAddress}:3000/virgil-jwt?identity=${encodeURIComponent(identity)}`)
      .then((res) => res.json())
      .then((data) => data.virgil_jwt);
};

/**
 * This method will return the an initialised EThree instance and sets the
 * getTokenFactoryto equal to the getToken variable, a method which expects a paramerter as indentity
 * ,
 */
const initializeUser = () => {
  const getToken = getTokenFactory(`EMAIL_ADDRESS_USER`);
  return EThree.initialize(getToken, { AsyncStorage });
};

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Home />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
