import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick.js';

/**
 * This is the view after a user has been signed in
 *
 * @param navigation - for navigating to another view in the stack navigation
 * @param route - here we can access the route params
 */
const Home = ({ navigation: { navigate }, route }) => {
  const [receiver, setReceiver] = useState();
  const { signedInUser } = route.params;

  useEffect(() => {
    initChatWith(signedInUser, setReceiver); // faked that a user has been selected to chat with
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.contain}>
        <AwesomeButtonRick width={200} type="primary" onPress={() => navigate('Camera', { signedInUser, receiver })}>
          <Text style={styles.txt}> Camera </Text>
        </AwesomeButtonRick>
        <AwesomeButtonRick width={200} type="primary" onPress={() => navigate('Gallery', { signedInUser, receiver })}>
          <Text style={styles.txt}>Gallery</Text>
        </AwesomeButtonRick>
        <AwesomeButtonRick width={200} type="primary" onPress={() => navigate('Test')}>
          <Text style={styles.txt}> Test </Text>
        </AwesomeButtonRick>
      </View>
    </View>
  );
};

/**
 * This method simulates the situation that a user picks a user to chat with,
 * we store the username of this user
 *
 * @param setReceiver
 */
const initChatWith = (signedInUser, setReceiver) => {
  // we currently have two users, this is going to change
  if (signedInUser === 'acdaling@gmail.com') {
    setReceiver('hello@gmail.com');
  } else if (signedInUser === 'hello@gmail.com') {
    setReceiver('acdaling@gmail.com');
  }
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contain: {
    flex: 1,
    maxHeight: 250,
    justifyContent: 'space-around',
  },
  txt: {
    color: 'white',
    fontSize: 30,
  },
});
