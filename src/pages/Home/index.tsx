import React from 'react';
import {observer, useWhen} from '@quarkunlimit/qu-mobx';
import type {IHomeProps} from './interface';
import {Provider, useStore} from './store/RootStore';
import {View} from 'react-native';
import {ListContent} from './modules/ListContent';
import {TotalInfo} from './modules/TotalInfo';
import {FilterRow} from './modules/FilterRow';
import {Empty} from './modules/Empty';

const Home = observer(function Home_(props: IHomeProps) {
  const root = useStore();
  const {logic} = root;

  useWhen(
    () => true,
    () => {
      logic.init();
    },
  );

  return (
    <View style={{padding: 8}}>
      <FilterRow />
      <TotalInfo />
      <ListContent />
      <Empty />
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
