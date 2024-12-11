import React from 'react';
import {observer} from '@quarkunlimit/qu-mobx';
import type {IHomeProps} from './interface';
import {Provider, useStore} from './store/RootStore';
import {Button, Text, View} from 'react-native';

const Home = observer(function Home_(props: IHomeProps) {
  const root = useStore();
  const {logic} = root;

  return (
    <View>
      <Text>Home</Text>
      <Text>{logic.count}</Text>
      <Button title="+1" onPress={logic.addItem}></Button>
    </View>
  );
});

export default observer(function HomePage(props: IHomeProps) {
  return (
    <Provider>
      <Home {...props} />
    </Provider>
  );
});

export * from './interface';
