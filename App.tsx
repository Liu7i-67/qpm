/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import Home from './src/pages/Home';
import Hisui from './src/pages/Hisui';
import Paldea from './src/pages/Paldea';
import {globalColor} from './src/globalStyle';
import {observer} from '@quarkunlimit/qu-mobx';
import {Provider, useStore} from './src/globalStore/index';
import {LoadingModal} from './src/layout/LoadingModal';
import {EPage} from './src/interface';
import Kitakami from './src/pages/Kitakami';
import Blueberry from './src/pages/Blueberry';

const backgroundStyle: StyleProp<ViewStyle> = {
  backgroundColor: globalColor.background,
  flex: 1,
};

const App = observer(function App_(): React.JSX.Element {
  const global = useStore();
  const {logic} = global;

  return (
    <View style={backgroundStyle}>
      <LoadingModal />
      {logic.currentPage === EPage.Home && <Home />}
      {logic.currentPage === EPage.Hisui && <Hisui />}
      {logic.currentPage === EPage.Paldea && <Paldea />}
      {logic.currentPage === EPage.Kitakami && <Kitakami />}
      {logic.currentPage === EPage.Blueberry && <Blueberry />}
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
