import React from 'react';
import {observer} from '@quarkunlimit/qu-mobx';
import {useStore} from '../store/RootStore';
import {
  Alert,
  Button,
  Linking,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {IArceusMark} from '../store/RootStore/interface';

const options = [
  {
    label: '未捕获',
    value: 0,
    color: 'gray',
  },
  {
    label: '已捕获',
    value: 1,
    color: '#13c2c2',
  },
  {
    label: '研究完成',
    value: 2,
    color: 'green',
  },
];

const styleView: StyleProp<ViewStyle> = {
  padding: 8,
  borderWidth: 1,
  marginTop: 4,
  borderRightWidth: 0,
};

const styleView2: StyleProp<ViewStyle> = {
  ...styleView,
  borderRightWidth: 1,
  borderTopRightRadius: 4,
  borderBottomRightRadius: 4,
};

const styleView3: StyleProp<ViewStyle> = {
  ...styleView,
  borderTopLeftRadius: 4,
  borderBottomLeftRadius: 4,
};
const styleView4: StyleProp<ViewStyle> = {
  display: 'flex',
  flexDirection: 'row',
};
const styleView5: StyleProp<ViewStyle> = {
  ...styleView4,
  flex: 1,
};

export const ArceusMarkItem = observer(function ArceusMarkItem_(props: {
  item: IArceusMark;
}) {
  const root = useStore();
  const {logic} = root;
  const {item} = props;

  return (
    <View
      style={{borderWidth: 1, borderRadius: 8, padding: 8, marginBottom: 8}}>
      <View style={styleView4}>
        <Text style={{flex: 1}}>{item.name}</Text>
        <View style={styleView5}>
          {item.attrs.map(a => (
            <Text key={a} style={{marginRight: 8}}>
              {a}
            </Text>
          ))}
        </View>
      </View>
      <View style={styleView4}>
        <Text style={{flex: 1}}>洗翠编号:{item.no}</Text>
        <Text style={{flex: 1}}>全国编号:{item.globalNo}</Text>
      </View>
      <View style={styleView4}>
        {options.map((o, index) => (
          <View key={o.value} style={index === 0 ? styleView3 : styleView}>
            <Text>{o.label}</Text>
          </View>
        ))}
        <TouchableOpacity
          onPress={async () => {
            const url = `https://wiki.52poke.com/wiki/${item.name}#获得方式`;
            await Linking.openURL(url);
          }}>
          <View style={styleView2}>
            <Text style={{color: '#a4c936'}}>百科</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
});
