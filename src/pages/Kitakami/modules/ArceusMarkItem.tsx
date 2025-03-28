import React from 'react';
import {observer} from '@quarkunlimit/qu-mobx';
import {useStore} from '../store/RootStore';
import {
  Image,
  Linking,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {IArceusMark} from '../store/RootStore/interface';
import {QText} from '../../../components/QText';
import {imageSource} from '../../../utils/imageSource';
import {QAttr} from '../../../components/QAttr';

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
];

const styleView: StyleProp<ViewStyle> = {
  padding: 8,
  borderWidth: 1,
  marginTop: 4,
  borderRightWidth: 0,
  flex: 1,
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
      }}>
      <View style={{display: 'flex', flexDirection: 'row', marginBottom: 4}}>
        <Image
          source={imageSource[(item.imageNo || 1) as 1]}
          style={{backgroundColor: '#00000050', borderRadius: 4}}
        />
        <View
          style={{flex: 1, paddingLeft: 16, justifyContent: 'space-between'}}>
          <QText>{item.name}</QText>
          <View style={styleView4}>
            {item.attrs.map(a => (
              <QAttr key={a} attr={a} />
            ))}
          </View>
          <QText>北上编号:{item.no}</QText>
          <QText>全国编号:{item.globalNo}</QText>
        </View>
      </View>

      <View style={styleView4}>
        {options.map((o, index) => (
          <TouchableOpacity
            key={o.value}
            onPress={() => logic.changeStatus?.(item, o.value)}
            style={index === 0 ? styleView3 : styleView}>
            <QText style={{textAlign: 'center'}}>{o.label}</QText>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          onPress={async () => {
            const url = `https://wiki.52poke.com/wiki/${item.name}#获得方式`;
            await Linking.openURL(url);
          }}
          style={styleView2}>
          <QText style={{textAlign: 'center'}}>百科</QText>
        </TouchableOpacity>
      </View>
      <QText
        style={{
          position: 'absolute',
          top: 4,
          right: 8,
          backgroundColor: info?.color,
          paddingVertical: 2,
          paddingHorizontal: 6,
          borderTopLeftRadius: 8,
          borderBottomRightRadius: 8,
        }}>
        {info?.label}
      </QText>
    </View>
  );
});
