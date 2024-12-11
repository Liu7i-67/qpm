import React from 'react';
import {observer} from '@quarkunlimit/qu-mobx';
import {useStore} from '../store/RootStore';
import {QText} from '../../../components/QText';

export const Empty = observer(function Empty_() {
  const root = useStore();
  const {logic} = root;

  if (logic.showList.length) {
    return null;
  }

  return <QText style={{textAlign: 'center'}}>没有符合条件的内容</QText>;
});
