import React from 'react';
import {observer} from '@quarkunlimit/qu-mobx';
import {useStore} from '../store/RootStore';
import {View} from 'react-native';
import {QText} from '../../../components/QText';

export const TotalInfo = observer(function TotalInfo_() {
  const root = useStore();
  const {computed, logic} = root;

  return (
    <View style={{display: 'flex', flexDirection: 'row', marginBottom: 8}}>
      <QText style={{marginRight: 8}}>
        已捕获数量：{computed.countInfo[1]}/{logic.list.length}
      </QText>
      <QText>
        已研究完成数量：{computed.countInfo[2]}/{logic.list.length}
      </QText>
    </View>
  );
});
