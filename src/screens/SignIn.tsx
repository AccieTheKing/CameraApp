import React, { useState } from 'react';
import { StyleSheet, View, Text, ImageBackground, TextInput } from 'react-native';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick.js';

/**
 *
 */
const SignIn = ({ navigation }) => {
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
            />
          </View>
        </View>
      </View>
      <View style={styles.mainRow}>
        <AwesomeButtonRick
          width={200}
          style={styles.loginBtn}
          type="primary"
          onPress={() => authenticateUser(username, password)}
        >
          <Text style={styles.loginBtnText}>Sign In</Text>
        </AwesomeButtonRick>
      </View>
    </ImageBackground>
  );
};

const authenticateUser = (username, password) => {
  console.log(`username: ${username} || password: ${password}`);
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
