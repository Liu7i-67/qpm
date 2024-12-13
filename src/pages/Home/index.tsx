import React from 'react';
import {observer, useWhen} from '@quarkunlimit/qu-mobx';
import type {IHomeProps} from './interface';
import {Provider, useStore} from './store/RootStore';
import {FlatList, View} from 'react-native';
import {TotalInfo} from './modules/TotalInfo';
import {FilterRow} from './modules/FilterRow';
import {Empty} from './modules/Empty';
import {ArceusMarkItem} from './modules/ArceusMarkItem';

const Home = observer(function Home_(props: IHomeProps) {
  const root = useStore();
  const {logic, computed} = root;

  useWhen(
    () => true,
    () => {
      logic.init();
    },
  );

  return (
    <FlatList
      style={{padding: 8}}
      ListHeaderComponent={
        <View>
          <FilterRow />
          <TotalInfo />
        </View>
      }
      initialNumToRender={4}
      onEndReached={logic.showMore}
      onEndReachedThreshold={0.4}
      ListEmptyComponent={<Empty />}
      data={computed.dataSource}
      renderItem={({item}) => <ArceusMarkItem item={item} />}
      keyExtractor={item => item.no}></FlatList>
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
