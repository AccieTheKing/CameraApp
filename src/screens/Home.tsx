import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Camera from './components/Camera';
import Gallery from './Gallery';

const Home = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button color="red" title="Camera" onPress={() => navigation.navigate('Camera')} />
      <Button title="Gallery" onPress={() => navigation.navigate('Gallery')} />
      <Button title="Test" onPress={() => navigation.navigate('Test')} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    color: 'red',
  },
});
