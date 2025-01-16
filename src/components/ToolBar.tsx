import React from 'react';
import {observer} from '@quarkunlimit/qu-mobx';
import {useStore} from '../globalStore/index';
import {Pressable, View} from 'react-native';
import {QText} from './QText';
import {QIcon} from './QIcon';

export const ToolBar = observer(function ToolBar_() {
  const root = useStore();
  const {logic} = root;

  return (
    <View
      style={{
        height: 60,
        borderTopColor: '#666',
        borderTopWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Pressable
        style={{paddingHorizontal: 16}}
        onPress={() => {
          logic.backHome();
        }}>
        <QIcon />
        <QText>首页</QText>
      </Pressable>
    </View>
  );
});
