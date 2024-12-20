import React from 'react';
import {observer} from '@quarkunlimit/qu-mobx';
import {useStore} from '../store/RootStore';
import {TouchableOpacity} from 'react-native';
import {QText} from '../../../components/QText';

export const ScrollToTop = observer(function ScrollToTop_() {
  const root = useStore();
  const {refs} = root;

  return (
    <TouchableOpacity
      style={{
        position: 'absolute',
        right: 20,
        bottom: 40,
        backgroundColor: '#000',
        padding: 8,
        borderRadius: 4,
        opacity: 0.7,
      }}
      onPress={() =>
        refs.listRef.current?.scrollToOffset?.({
          offset: 0,
        })
      }>
      <QText>顶</QText>
    </TouchableOpacity>
  );
});
