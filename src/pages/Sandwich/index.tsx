import React from 'react';
import {observer, useWhen} from '@quarkunlimit/qu-mobx';
import type {IPaldeaProps} from './interface';
import {Provider, useStore} from './store/RootStore';
import {FlatList, View} from 'react-native';
import {TotalInfo} from './modules/TotalInfo';
import {FilterRow} from './modules/FilterRow';
import {Empty} from './modules/Empty';
import {ScrollToTop} from './modules/ScrollToTop';
import {SandwichItem} from './modules/SandwichItem';
import {FilterModal} from './modules/FilterModal';

const Sandwich = observer(function Sandwich_(props: IPaldeaProps) {
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
        renderItem={({item}) => <SandwichItem item={item} />}
        keyExtractor={item => `${item.id}`}></FlatList>
      <ScrollToTop />
      <FilterModal />
    </View>
  );
});

export default observer(function PaldeaPage(props: IPaldeaProps) {
  return (
    <Provider>
      <Sandwich {...props} />
    </Provider>
  );
});

export * from './interface';
