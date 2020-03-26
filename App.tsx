import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
// navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// screens
import { Launch, LoadingScreen } from './src/screens/Launch';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import Home from './src/screens/Home';
import Camera from './src/screens/components/Camera';
import Gallery from './src/screens/Gallery';

// Virgil SDK
import AsyncStorage from '@react-native-community/async-storage';
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

/**
 * This method will get the username from storage
 */
const getUsername = async () => {
  const username = await AsyncStorage.getItem('cameraAppUsername');
  return username;
};

/**
 * This method will store the username into the storage on the device, after firebase confirms the user
 *
 * @param username - the username that is going to be stored
 */
const storeUsername = async (username) => {
  const storedUsername = await AsyncStorage.setItem('cameraAppUsername', username).catch((err) => {
    console.log('Something went wrong with storing the username ', err);
  });
  return storedUsername;
};

const test = async () => {
  AsyncStorage.getAllKeys().then((res) => console.log(res));
  const usernameTest = await AsyncStorage.getItem('cameraAppUsername');
  console.log('username van de App component', usernameTest);
};

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignout, setIsSignout] = useState(false);
  const [userToken, setUserToken] = useState(null);

  // test async storage with username
  const [username, setUsername] = useState(null);

  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Launch"
        screenOptions={{
          headerStyle: { backgroundColor: '#aad3ea' },
          headerTintColor: 'white',
          headerTitleStyle: { fontSize: 25 },
        }}
      >
        {/* {username === null ? ( */}
        <React.Fragment>
          <Stack.Screen
            name="Launch"
            component={Launch}
            options={{
              headerShown: false,
              animationTypeForReplace: isSignout ? 'pop' : 'push',
            }}
          />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </React.Fragment>
        {/* ) : ( */}
        <React.Fragment>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: true,
            }}
          />
          <Stack.Screen name="Camera" component={Camera} />
          <Stack.Screen name="Gallery" component={Gallery} />
          <Stack.Screen name="Test" component={Test} />
        </React.Fragment>
        {/* )} */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

function Test({ navigation, test }) {
  console.log(test);
  return (
    <View>
      <Text>Hallo dit is een test</Text>
      <Button title="Opnieuw naar test" onPress={() => navigation.push('Test')} />
    </View>
  );
}

export default App;
