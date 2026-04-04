import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import WaterfallDetailScreen from '../screens/WaterfallDetailScreen';
import SearchScreen from '../screens/SearchScreen';


import MainTabs from './MainTabs';

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Main: undefined;
  WaterfallDetail: { waterfallId: string };
  Search: undefined;
  Camera: { locationName?: string } | undefined;
  Gallery: { locationName?: string; waterfallId?: string } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="WaterfallDetail" component={WaterfallDetailScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}