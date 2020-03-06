import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
// navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// screens
import { Authentication, LoadingScreen } from './src/screens/Authentication';
import Home from './src/screens/Home';
import Camera from './src/screens/components/Camera';
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
  const [isLoading, setIsLoading] = useState(false);
  const [isSignout, setIsSignout] = useState(false);
  const [userToken, setUserToken] = useState(null);

  // show loading animation if token is not available
  if (isLoading) {
    // return <LoadingScreen />;
  }

  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName="Authentication"
        screenOptions={{
          headerStyle: { backgroundColor: '#aad3ea' },
          headerTintColor: 'white',
          headerTitleStyle: { fontSize: 25 },
        }}
      >
        {/* {userToken === null ? ( */}
        {/* // if user token is null, then the user must sign in again */}
        <Stack.Screen
          name="Authentication"
          component={Authentication}
          options={{
            headerShown: false,
            animationTypeForReplace: isSignout ? 'pop' : 'push',
          }}
        />
        {/* ) : ( */}
        <React.Fragment>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Camera" component={Camera} />
          <Stack.Screen name="Gallery" component={Gallery} />
          <Stack.Screen name="Test" component={test} />
        </React.Fragment>
        {/* )} */}
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
