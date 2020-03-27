import React, { useState, useEffect } from 'react';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick.js';
import { StyleSheet, View, Text, ImageBackground, TextInput } from 'react-native';
import { getStoredUsername } from '../appLib/systemStorage/username';
import auth from '@react-native-firebase/auth';

const SignUp = ({ navigation }) => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [cachedUser, setCachedUser] = useState(false);

  useEffect(() => {
    getStoredUsername().then((data) => {
      if (data) {
        setUsername(data);
      } else {
        setCachedUser(false);
      }
    });

    return () => {
      setCachedUser(false);
    };
  }, []);

  async function register(navigation, email, password) {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      navigation.navigate('Home');
    } catch (e) {
      console.error(e.message);
    }
  }

  return (
    <ImageBackground source={require('../img/appBackground4.png')} style={styles.applicationContainer}>
      <View style={styles.mainRow}>
        <View style={styles.headerContainer}>
          <Text style={styles.applicationTitle}>Doccs</Text>
          <Text style={styles.applicationSubTitle}>CameraApp</Text>
        </View>
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
              placeholder="Password"
              style={styles.inputFieldStyle}
              onChangeText={(password) => setPassword(password)}
              secureTextEntry={true}
            />
          </View>
          <View>
            <Text style={styles.signInInputTitle}>Repeat your password</Text>
            <TextInput
              placeholder="Password"
              style={styles.inputFieldStyle}
              onChangeText={(password) => setPassword(password)}
              secureTextEntry={true}
            />
          </View>
        </View>
      </View>
      <View style={styles.headerContainer}>
        <AwesomeButtonRick
          width={200}
          style={styles.loginBtn}
          type="primary"
          onPress={() => register(navigation, username, password)}
        >
          <Text style={styles.loginBtnText}>Sign Up</Text>
        </AwesomeButtonRick>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  applicationContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  headerContainer: {
    marginBottom: 50,
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
    justifyContent: 'flex-start',
  },
  mainRow: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 50,
  },
  signInFieldsContainer: {
    flex: 1,
    justifyContent: 'space-between',
    maxHeight: 200,
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

export default SignUp;
