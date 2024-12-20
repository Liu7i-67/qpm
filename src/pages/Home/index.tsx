import React from 'react';
import {observer} from '@quarkunlimit/qu-mobx';
import type {IHomeProps} from './interface';
import {Provider, useStore} from './store/RootStore';
import {Pressable, ScrollView} from 'react-native';
import {QText} from '../../components/QText';

const Home = observer(function Home_(props: IHomeProps) {
  const root = useStore();
  const {computed, global} = root;

  return (
    <ScrollView style={{padding: 8}}>
      {computed.navs.map?.(nav => {
        return (
          <Pressable
            key={nav.page}
            style={{
              padding: 16,
              marginVertical: 4,
              borderWidth: 1,
              borderRadius: 4,
            }}
            onPress={() => {
              global.logic.changePage(nav.page);
            }}>
            <QText>{nav.label}</QText>
          </Pressable>
        );
      })}
    </ScrollView>
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
