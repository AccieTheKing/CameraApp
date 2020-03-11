import React, { useState } from 'react';
import { StyleSheet, View, Text, ImageBackground, TextInput, Platform } from 'react-native';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick.js';
import AsyncStorage from '@react-native-community/async-storage';

const getUsername = async () => {
  let username;
  try {
    AsyncStorage.getAllKeys().then((res) => console.log(res));
    username = await AsyncStorage.getItem('cameraAppUsername');
  } catch (err) {
    console.log(err);
  }

  return username;
};

const storeUsername = async (username) => {
  try {
    await AsyncStorage.setItem('cameraAppUsername', username);
  } catch (err) {
    console.log('Something went wrong', err);
  }
};

/**
 *
 */
const SignIn = ({ navigation, name }) => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  return (
    <ImageBackground source={require('../img/appBackground4.png')} style={styles.applicationContainer}>
      <View style={styles.headerRow}>
        <View style={styles.headerContainer}>
          <Text style={styles.applicationTitle}>Doccs</Text>
          <Text style={styles.applicationSubTitle}>CameraApp</Text>
        </View>
      </View>
      <View style={styles.mainRow}>
        <View style={styles.signInFieldsContainer}>
          <View>
            <Text style={styles.signInInputTitle}>Username</Text>
            <TextInput
              placeholder="Username"
              value={username}
              onChangeText={(text) => setUsername(text)}
              style={styles.inputFieldStyle}
            />
          </View>
          <View>
            <Text style={styles.signInInputTitle}>Password</Text>
            <TextInput
              placeholder="password"
              secureTextEntry={true}
              style={styles.inputFieldStyle}
              onChangeText={(password) => setPassword(password)}
            />
          </View>
        </View>
      </View>
      <View style={styles.mainRow}>
        <AwesomeButtonRick
          width={200}
          style={styles.loginBtn}
          type="primary"
          onPress={() => authenticateUser(navigation, { username, password })}
        >
          <Text style={styles.loginBtnText}>Sign In</Text>
        </AwesomeButtonRick>
      </View>
    </ImageBackground>
  );
};

/**
 * This method will check the credentials of the user and if the user has an authentication token that is st
 *
 * @param navigation - to navigate to another view
 */
const authenticateUser = async (navigation, { username, password }) => {
  console.log(`User with username: ${username} and password: ${password}`);
  // fetch(`firebase-login-url`).then(res => res.json()).then(data => data{
  // })

  storeUsername(username).then(() => {
    navigation.navigate('Home');
  });
};

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
  headerRow: {
    flex: 1,
  },
  mainRow: {
    flex: 1,
    justifyContent: 'center',
  },
  signInFieldsContainer: {
    flex: 1,
    justifyContent: 'space-between',
    maxHeight: 160,
    marginLeft: 30,
    marginRight: 30,
  },
  signInInputTitle: {
    color: '#FFF',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  inputFieldStyle: {
    color: '#000',
    borderBottomColor: '#FFF',
    borderBottomWidth: 2,
    backgroundColor: 'transparent',
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

export default SignIn;
