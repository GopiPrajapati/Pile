import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Routes } from './Routes';
import { EventDetailsScreen, LoginScreen, MainAppScreen, SplashScreen } from './screens';

const Stack = createNativeStackNavigator();

const RootNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName={Routes.SPLASH_SCREEN}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={Routes.SPLASH_SCREEN} component={SplashScreen} />
      <Stack.Screen name={Routes.LOGIN_SCREEN} component={LoginScreen} />
      <Stack.Screen name={Routes.MAIN_SCREEN} component={MainAppScreen} />
      <Stack.Screen
        name={Routes.EVENT_DETAILS_SCREEN}
        component={EventDetailsScreen}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default RootNavigator;
