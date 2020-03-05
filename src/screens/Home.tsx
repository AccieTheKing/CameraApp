import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import AwesomeButtonRed from 'react-native-really-awesome-button/src/themes/red.js';
import AwesomeButtonC137 from 'react-native-really-awesome-button/src/themes/c137.js';

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.contain}>
        <AwesomeButtonRed width={80} type="anchor" onPress={() => navigation.navigate('Camera')}>
          <Text style={styles.txt}> Camera </Text>
        </AwesomeButtonRed>
        <AwesomeButtonC137 width={80} type="anchor" onPress={() => navigation.navigate('Gallery')}>
          <Text style={styles.txt}>Gallery</Text>
        </AwesomeButtonC137>
        <AwesomeButtonRed width={80} onPress={() => navigation.navigate('Test')}>
          <Text style={styles.txt}> Test </Text>
        </AwesomeButtonRed>
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
    alignSelf: 'auto',
    justifyContent: 'space-around',
  },
  txt: {
    color: 'white',
  },
});
