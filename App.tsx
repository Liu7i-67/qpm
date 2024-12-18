/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import Home from './src/pages/Home';
import {globalColor} from './src/globalStyle';
import {observer} from '@quarkunlimit/qu-mobx';
import {Provider} from './src/globalStore/index';
import {LoadingModal} from './src/layout/LoadingModal';

const backgroundStyle: StyleProp<ViewStyle> = {
  backgroundColor: globalColor.background,
  flex: 1,
};

const App = observer(function App_(): React.JSX.Element {
  return (
    <View style={backgroundStyle}>
      <LoadingModal />
      <Home />
    </View>
  );
});

export default observer(function Root() {
  return (
    <Provider>
      <App />
    </Provider>
  );
});
