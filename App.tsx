import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
// navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// screens
import { Launch, LoadingScreen } from './src/screens/Launch';
import SignIn from './src/screens/SignIn';
import Home from './src/screens/Home';
import Camera from './src/screens/components/Camera';
import Gallery from './src/screens/Gallery';

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
        </React.Fragment>
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
