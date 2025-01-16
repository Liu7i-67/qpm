import React from 'react';
import {Image} from 'react-native';

const icons = {
  home: require('../assets/icons/home.png'),
  search: require('../assets/icons/search.png'),
  delete: require('../assets/icons/delete.png'),
  close: require('../assets/icons/close.png'),
} as const;

export const QIcon = function QIcon_(props: {type?: keyof typeof icons}) {
  return (
    <Image
      source={icons[props.type || 'home']}
      style={{
        width: 24,
        height: 24,
      }}
    />
  );
};
