import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
// navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// screens
import { Launch, LoadingScreen } from './src/screens/Launch';
import SignIn from './src/screens/SignIn';
import Home from './src/screens/Home';
import Camera from './src/screens/components/Camera';
import Gallery from './src/screens/Gallery';

const App = () => {
  const [isSignout, setIsSignout] = useState(false);

  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Authentication"
        screenOptions={{
          headerStyle: { backgroundColor: '#aad3ea' },
          headerTintColor: 'white',
          headerTitleStyle: { fontSize: 25 },
        }}
      >
        <Stack.Screen
          name="Launch"
          component={Launch}
          options={{
            headerShown: false,
            animationTypeForReplace: isSignout ? 'pop' : 'push',
          }}
        />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerLeft: null,
          }}
        />
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
