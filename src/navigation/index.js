import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import PackageScreen from '../screens/PackageScreen';
import PackageBookingForm from '../screens/PackageBookingForm';
import BookedPackages from '../screens/BookedPackages';
import UpdatePackage from '../screens/UpdatePackage';

const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome' screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="PackageScreen" component={PackageScreen} />
        <Stack.Screen name="PackageBookingForm" component={PackageBookingForm} />
        <Stack.Screen name="BookedPackages" component={BookedPackages} />
        <Stack.Screen name="UpdatePackage" component={UpdatePackage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;