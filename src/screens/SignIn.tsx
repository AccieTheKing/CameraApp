import React, { useState, useEffect, Fragment } from 'react';
import { StyleSheet, View, Text, ImageBackground, TextInput, Alert } from 'react-native';
import { storeInGlobalStore, fetchFromGlobalStore, deleteFromGlobalStore } from '../appLib/systemStorage/global';
import { getJWTtoken } from '../appLib/systemStorage/virgil';
import auth from '@react-native-firebase/auth';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick.js';

/**
 * This is the SignIn component where the user can signin into the application
 */
const SignIn = ({ navigation }) => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [cachedUser, setCachedUser] = useState(false); // Did user already logged in before

  useEffect(() => {
    fetchFromGlobalStore('cameraAppUsername').then((data) => {
      if (data) {
        setUsername(data);
        setCachedUser(true);
      } else {
        setCachedUser(false);
      }
    });

    return () => {
      setCachedUser(false);
    };
  }, []);

  return (
    <ImageBackground source={require('../img/appBackground4.png')} style={styles.applicationContainer}>
      <View style={styles.headerRow}>
        <View style={styles.headerContainer}>
          <Text style={styles.applicationTitle}>Doccs</Text>
          <Text style={styles.applicationSubTitle}>CameraApp</Text>
        </View>
      </View>
      {cachedUser === false ? (
        <View style={styles.mainRow}>
          <View style={styles.signInFieldsContainer}>
            <View>
              <Text style={styles.signInInputTitle}>Username</Text>
              <TextInput
                placeholder="Username"
                style={styles.inputFieldStyle}
                onChangeText={(username) => setUsername(username)}
              />
            </View>
            <View>
              <Text style={styles.signInInputTitle}>Password</Text>
              <TextInput
                placeholder="password"
                style={styles.inputFieldStyle}
                onChangeText={(password) => setPassword(password)}
                secureTextEntry={true}
              />
            </View>
          </View>
          <View style={styles.mainRow}>
            <AwesomeButtonRick
              width={200}
              style={styles.loginBtn}
              type="primary"
              onPress={() => authenticateUser(navigation, username, password)}
            >
              <Text style={styles.loginBtnText}>Sign In</Text>
            </AwesomeButtonRick>
          </View>
        </View>
      ) : (
        <View style={styles.mainRow}>
          <View style={styles.mainRow}>
            <Text>Sign in with user {username}</Text>
          </View>
          <View style={styles.mainRow}>
            <Fragment>
              <AwesomeButtonRick
                width={200}
                style={styles.loginBtn}
                type="primary"
                onPress={() => authenticateUser(navigation, username, password)}
              >
                <Text style={styles.loginBtnText}>Yes</Text>
              </AwesomeButtonRick>
              <AwesomeButtonRick
                width={200}
                style={styles.loginBtn}
                type="primary"
                onPress={() => cancelAutoLogin(setCachedUser)}
              >
                <Text style={styles.loginBtnText}>Cancel</Text>
              </AwesomeButtonRick>
            </Fragment>
          </View>
        </View>
      )}
    </ImageBackground>
  );
};

/**
 * This method will authenticate the user and provides the user with some
 * messages if fields are blank or the credentials are wrong
 *
 * @param username - email address of the user
 * @param password -  password of the user
 */
const authenticateUser = async (navigation, username, password) => {
  if (textInputValidation(username) && textInputValidation(password)) {
    try {
      const firebase = await auth().signInWithEmailAndPassword(username, password); // check user's credentials
      const firebaseEmail = firebase.user.email;
      await storeInGlobalStore('cameraAppUsername', firebaseEmail); // store username
      await storeJwt(firebaseEmail);
      navigation.navigate('Home');
    } catch (err) {
      Alert.alert('Whoops', `${err.message}`);
    }
  } else {
    Alert.alert(`Ohhh?`, 'You forgot to fill in some fields');
  }
};

/**
 * This method will get the JWT, stores it and uses it to get the VirgilJWT
 * in order to make use of the VirgilSDK
 *
 * @param identity
 */
const storeJwt = async (identity) => {
  try {
    const token = await getJWTtoken(identity);
    await storeInGlobalStore('cameraAppJWT', token); // store JWT
  } catch (err) {
    console.log('Something went wrong with JWT token ' + err.message);
  }
};

/**
 * This method will cancel the login and removes the stored username
 * from system memory
 *
 * @param setCachedUser -
 */
const cancelAutoLogin = (setCachedUser) => {
  deleteFromGlobalStore('cameraAppUsername').then(() => setCachedUser(false));
};

/**
 * This method will check if a textfield is not blank
 * and returns true or false
 *
 * @param text - field to check if empty
 */
const textInputValidation = (text: string) => {
  if (text && text.length > 0) {
    return true;
  }
  return false;
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
