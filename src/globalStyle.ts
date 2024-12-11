import {StyleSheet} from 'react-native';

export const globalColor = {
  text: '#fff',
  background: '#333',
};

export const gloablStyle = StyleSheet.create({
  colors: {
    color: 'red',
  },
  text: {
    color: globalColor.text,
  },
});
