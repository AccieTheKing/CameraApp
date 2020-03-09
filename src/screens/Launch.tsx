import React from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, ImageBackground } from 'react-native';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick.js';

/**
 * Main screen for Authentication
 */
const Launch = ({ navigation }) => {
  return (
    <ImageBackground source={require('../img/appBackground4.png')} style={styles.applicationContainer}>
      <View style={styles.applicationRow}>
        <View style={styles.headerContainer}>
          <Text style={styles.applicationTitle}>Doccs</Text>
          <Text style={styles.applicationSubTitle}>CameraApp</Text>
        </View>
      </View>
      <View style={styles.applicationRow2}>
        <View style={styles.authBtnSpace}>
          <AwesomeButtonRick
            width={200}
            style={styles.loginBtn}
            type="primary"
            onPress={() => navigation.navigate('SignIn')}
          >
            <Text style={styles.loginBtnText}>Login</Text>
          </AwesomeButtonRick>
          <AwesomeButtonRick
            width={200}
            style={styles.loginBtn}
            type="primary"
            onPress={() => alert('Login', 'You pressed the login button')}
          >
            <Text style={styles.loginBtnText}>Sign Up</Text>
          </AwesomeButtonRick>
        </View>
      </View>
      <View style={styles.applicationRow2}></View>
    </ImageBackground>
  );
};

/**
 * Shows loading screen when restoring the user token.
 */
const LoadingScreen = () => {};

const styles = StyleSheet.create({
  applicationContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  headerContainer: {
    marginTop: 50,
  },
  applicationTitle: {
    color: '#FFF',
    fontSize: 40,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  applicationSubTitle: {
    color: '#FFF',
    fontSize: 15,
    textAlign: 'center',
  },
  applicationRow: {
    flex: 1,
  },
  applicationRow2: {
    flex: 1,
    justifyContent: 'center',
  },
  authBtnSpace: {
    flex: 1,
    justifyContent: 'space-around',
    maxHeight: 150,
  },
  loginBtn: {
    alignSelf: 'center',
  },
  loginBtnText: {
    fontSize: 18,
    textTransform: 'uppercase',
    color: '#FFF',
    textAlign: 'center',
  },
});

export { Launch, LoadingScreen };
