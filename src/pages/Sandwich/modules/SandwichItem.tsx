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
import {ISandwich} from '../store/RootStore/interface';
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

export const SandwichItem = observer(function SandwichItem_(props: {
  item: ISandwich;
}) {
  const root = useStore();
  const {logic} = root;
  const {item} = props;

  return (
    <View
      style={{
        borderWidth: 1,
        borderRadius: 8,
        padding: 8,
        marginBottom: 8,
        position: 'relative',
      }}>
      <QText>{item.name}</QText>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        <QText>食力：</QText>
        {item.effect.split('\n').map(e => {
          return (
            <QText key={e} style={{paddingRight: 16}}>
              {e}
            </QText>
          );
        })}
      </View>
      {!!item.food && (
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <QText>食材：</QText>
          {item.food.split('\n')?.map?.((e, index) => {
            return (
              <QText key={`${e}_${index}`} style={{paddingRight: 16}}>
                {e}
              </QText>
            );
          })}
        </View>
      )}
      {!!item.herba && (
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <QText>调味料：</QText>
          {item.herba.split('\n')?.map?.((e, index) => {
            return (
              <QText key={`${e}_${index}`} style={{paddingRight: 16}}>
                {e}
              </QText>
            );
          })}
        </View>
      )}
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        <QText>获取途径：{item.method}</QText>
      </View>
      {!!item.place && (
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <QText>购买地点：</QText>
          {item.place.map?.((p, index) => {
            return p.shop.map(s => {
              return (
                <QText key={`${p.place}_${s}`} style={{paddingRight: 16}}>
                  {p.place}/{s}
                </QText>
              );
            });
          })}
        </View>
      )}
    </View>
  );
});
