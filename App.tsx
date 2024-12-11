/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Home from './src/pages/Home';

function App(): React.JSX.Element {
  const backgroundStyle = {
    backgroundColor: Colors.darker,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Home />
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
