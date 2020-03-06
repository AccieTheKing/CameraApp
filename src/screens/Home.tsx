import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import AwesomeButtonRed from 'react-native-really-awesome-button/src/themes/red.js';
import AwesomeButtonC137 from 'react-native-really-awesome-button/src/themes/c137.js';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick.js';

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.contain}>
        <AwesomeButtonRick width={200} type="primary" onPress={() => navigation.navigate('Camera')}>
          <Text style={styles.txt}> Camera </Text>
        </AwesomeButtonRick>
        <AwesomeButtonRick width={200} type="primary" onPress={() => navigation.navigate('Gallery')}>
          <Text style={styles.txt}>Gallery</Text>
        </AwesomeButtonRick>
        <AwesomeButtonRick width={200} type="primary" onPress={() => navigation.navigate('Test')}>
          <Text style={styles.txt}> Test </Text>
        </AwesomeButtonRick>
      </View>
    </View>
  );
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
