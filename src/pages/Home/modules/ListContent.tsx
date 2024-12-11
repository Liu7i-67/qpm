import React from 'react';
import {observer} from '@quarkunlimit/qu-mobx';
import {useStore} from '../store/RootStore';
import {View} from 'react-native';
import {ArceusMarkItem} from './ArceusMarkItem';

export const ListContent = observer(function ListContent_() {
  const root = useStore();
  const {logic} = root;

  return (
    <View>
      {logic.showList?.map?.(i => {
        return <ArceusMarkItem item={i} key={i.no} />;
      })}
    </View>
  );
});
