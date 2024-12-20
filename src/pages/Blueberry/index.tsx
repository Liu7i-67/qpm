import React from 'react';
import {observer, useWhen} from '@quarkunlimit/qu-mobx';
import type {IBlueberryProps} from './interface';
import {Provider, useStore} from './store/RootStore';
import {FlatList, View} from 'react-native';
import {TotalInfo} from './modules/TotalInfo';
import {FilterRow} from './modules/FilterRow';
import {Empty} from './modules/Empty';
import {ArceusMarkItem} from './modules/ArceusMarkItem';
import {ScrollToTop} from './modules/ScrollToTop';

const Blueberry = observer(function Blueberry_(props: IBlueberryProps) {
  const root = useStore();
  const {logic, computed, refs} = root;

  useWhen(
    () => true,
    () => {
      logic.init();
    },
  );

  return (
    <View style={{position: 'relative', flex: 1}}>
      <FlatList
        ref={refs.listRef}
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
      <ScrollToTop />
    </View>
  );
});

export default observer(function BlueberryPage(props: IBlueberryProps) {
  return (
    <Provider>
      <Blueberry {...props} />
    </Provider>
  );
});

export * from './interface';
