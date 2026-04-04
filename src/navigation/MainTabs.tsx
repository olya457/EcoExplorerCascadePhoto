import React from 'react';
import { Image, Platform, StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import MissionsScreen from '../screens/MissionsScreen';
import QuizScreen from '../screens/QuizScreen';
import StoriesScreen from '../screens/StoriesScreen';

export type MainTabParamList = {
  HomeTab: undefined;
  MapTab: undefined;
  MissionsTab: undefined;
  QuizTab: undefined;
  StoriesTab: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const icons = {
  HomeTab: require('../assets/icons/tab_home.png'),
  MapTab: require('../assets/icons/tab_map.png'),
  MissionsTab: require('../assets/icons/tab_missions.png'),
  QuizTab: require('../assets/icons/tab_quiz.png'),
  StoriesTab: require('../assets/icons/tab_stories.png'),
};

function TabIcon({
  routeName,
  focused,
}: {
  routeName: keyof MainTabParamList;
  focused: boolean;
}) {
  return (
    <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
      <Image
        source={icons[routeName]}
        resizeMode="contain"
        style={styles.icon}
      />
    </View>
  );
}

export default function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItem,
        tabBarIconStyle: styles.tabBarIconStyle,
        tabBarIcon: ({ focused }) => (
          <TabIcon
            routeName={route.name as keyof MainTabParamList}
            focused={focused}
          />
        ),
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen} />
      <Tab.Screen name="MapTab" component={MapScreen} />
      <Tab.Screen name="MissionsTab" component={MissionsScreen} />
      <Tab.Screen name="QuizTab" component={QuizScreen} />
      <Tab.Screen name="StoriesTab" component={StoriesScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    left: 32,
    right: 32,
    bottom: Platform.OS === 'android' ? 30 : 20,
    height: 58,
    backgroundColor: 'rgba(73, 101, 136, 0.96)',
    borderRadius: 22,
    borderTopWidth: 0,
    borderWidth: 1.2,
    borderColor: 'rgba(255,255,255,0.85)',
    elevation: 0,
    shadowColor: 'transparent',
    paddingHorizontal: 10,
    paddingTop: 6,
    paddingBottom: 6,
    overflow: 'hidden',
  },

  tabBarItem: {
    paddingHorizontal: 0,
    marginHorizontal: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },

  tabBarIconStyle: {
    margin: 0,
  },

  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconWrapActive: {
    backgroundColor: '#9FD24F',
  },

  icon: {
    width: 20,
    height: 20,
    tintColor: '#0B2745',
  },
});