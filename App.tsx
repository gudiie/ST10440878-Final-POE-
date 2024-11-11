import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import splashscreen from './splashscreen';
import information from './information';
import home from './home';
import edit from './edit';
import menu from './menu';
import cart from './cart';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={splashscreen} />
        <Stack.Screen name="infor" component={information} />
        <Stack.Screen name="Home" component={home} />
        <Stack.Screen name="Edit" component={edit} />
        <Stack.Screen name="Menu" component={menu} />
        <Stack.Screen name="Cart" component={cart} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


