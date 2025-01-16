import {StyleSheet} from 'react-native';

export const globalColor = {
  text: '#fff',
  background: '#333',
  backgroundEE: '#333333ee',
  hightLight: 'gold',
  null: 'transparent',
};

export const gloablStyle = StyleSheet.create({
  colors: {
    color: 'red',
  },
  text: {
    color: globalColor.text,
  },
});
