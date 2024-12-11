import React from 'react';
import {observer} from '@quarkunlimit/qu-mobx';
import {useStore} from '../store/RootStore';
import {
  Linking,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {IArceusMark} from '../store/RootStore/interface';
import {QText} from '../../../components/QText';

const options = [
  {
    label: '未捕获',
    value: 0,
    color: '#a5acac',
  },
  {
    label: '已捕获',
    value: 1,
    color: '#13c2c2',
  },
  {
    label: '研究完成',
    value: 2,
    color: '#166b2f',
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

  const info = options.find(i => i.value === item.status);

  return (
    <View
      style={{
        borderWidth: 1,
        borderRadius: 8,
        padding: 8,
        marginBottom: 8,
        position: 'relative',
        backgroundColor: `${info?.color}30`,
      }}>
      <View style={styleView4}>
        <QText style={{flex: 1}}>{item.name}</QText>
        <View style={styleView5}>
          {item.attrs.map(a => (
            <QText key={a} style={{marginRight: 8}}>
              {a}
            </QText>
          ))}
        </View>
      </View>
      <View style={styleView4}>
        <QText style={{flex: 1}}>洗翠编号:{item.no}</QText>
        <QText style={{flex: 1}}>全国编号:{item.globalNo}</QText>
      </View>
      <View style={styleView4}>
        {options.map((o, index) => (
          <TouchableOpacity
            key={o.value}
            onPress={() => logic.changeStatus?.(item, o.value)}>
            <View style={index === 0 ? styleView3 : styleView}>
              <QText>{o.label}</QText>
            </View>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          onPress={async () => {
            const url = `https://wiki.52poke.com/wiki/${item.name}#获得方式`;
            await Linking.openURL(url);
          }}>
          <View style={styleView2}>
            <QText>百科</QText>
          </View>
        </TouchableOpacity>
      </View>
      <QText
        style={{position: 'absolute', top: 4, right: 8, color: info?.color}}>
        {info?.label}
      </QText>
    </View>
  );
});
