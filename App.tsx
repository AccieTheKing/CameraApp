import React from 'react';
import { View, Text, Button } from 'react-native';
import Home from './src/screens/Home';
import Camera from './src/screens/components/Camera';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Gallery from './src/screens/Gallery';

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
