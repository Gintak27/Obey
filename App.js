import React, { Component } from 'react';

import { Platform, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';


import HomeActivity from './components/HomeActivity';
import GameActivity from './components/GameActivity';
import SplashScreen from './components/SplashScreen';

const RootStack = createStackNavigator(
{
  Home: { screen: HomeActivity },
  Game: { screen: GameActivity },
},
{
    initialRouteName: 'Home',
    headerMode: 'none',
}
);

const InitialNavigator = createSwitchNavigator({
  Splash: SplashScreen,
  App: RootStack
});

console.disableYellowBox = true;

export default class App extends Component {
  render() {
    return <InitialNavigator />;
  }
}

