import React from 'react';
import { View, Text, Button } from 'react-native';
import Home from './src/screens/Home';
import Camera from './src/screens/components/Camera';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Gallery from './src/screens/Gallery';

// Virgil SDK
// import AsyncStorage from '@react-native-community/async-storage';
// import { EThree } from '@virgilsecurity/e3kit-native';
// import { ipAddress } from './src/endPoints/index';

// /**
//  * Method to get a JSON WEB TOKEN from the backend, the idententy is being encoded so that
//  * it can be used to send to the backend as a get request
//  *
//  * @param identity - email address
//  */
// const getTokenFactory = (identity) => {
//   return () =>
//     fetch(`http://${ipAddress}:3000/virgil-jwt?identity=${encodeURIComponent(identity)}`)
//       .then((res) => res.json())
//       .then((data) => data.virgil_jwt);
// };

// /**
//  * This method will return the an initialised EThree instance and sets the
//  * getTokenFactoryto equal to the getToken variable, a method which expects a paramerter as indentity
//  * ,
//  */
// const initializeUser = () => {
//   const getToken = getTokenFactory(`EMAIL_ADDRESS_USER`);
//   return EThree.initialize(getToken, { AsyncStorage });
// };

const App = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#aad3ea' },
          headerTintColor: 'white',
          headerTitleStyle: { fontSize: 25 },
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Camera" component={Camera} />
        <Stack.Screen name="Gallery" component={Gallery} />
        <Stack.Screen name="Test" component={test} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

function test({ navigation }) {
  return (
    <View>
      <Text>Hallo dit is een test</Text>
      <Button title="Opnieuw naar test" onPress={() => navigation.push('Test')} />
    </View>
  );
}

export default App;
