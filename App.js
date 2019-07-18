/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';

import {createStackNavigator, createAppContainer} from 'react-navigation';

import {LoginScreen} from './components/LoginScreen.js';
import {HomeScreen} from './components/HomeScreen.js';

const NavigationStack = createStackNavigator(
  {
    Home: HomeScreen,
    Login: LoginScreen
  },
  {
    initialRouteName: 'Login'
  }
);

const AppContainer = createAppContainer(NavigationStack);

export default class App extends Component {
  constructor() {
    super();
  }

  render() {
    return(
      <AppContainer/>
    );
  }
}


