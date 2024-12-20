import React from 'react';
import {QText} from './QText';
import {Image, View} from 'react-native';

export const attrColors = {
  一般: '#bbbbaa',
  火: '#ff4422',
  水: '#3399ff',
  草: '#77cc55',
  电: '#ffcc33',
  格斗: '#bb5544',
  飞行: '#6699ff',
  毒: '#aa5599',
  虫: '#aabb22',
  岩石: '#bbaa66',
  地面: '#ddbb55',
  超能力: '#ff5599',
  冰: '#77ddff',
  龙: '#7766ee',
  幽灵: '#6666bb',
  恶: '#775544',
  妖精: '#ffaaff',
  钢: '#aaaabb',
};

export const attrIndex = {
  一般: 0,
  火: 9,
  水: 10,
  草: 11,
  电: 12,
  格斗: 1,
  飞行: 2,
  毒: 3,
  虫: 6,
  岩石: 5,
  地面: 4,
  超能力: 13,
  冰: 14,
  龙: 15,
  幽灵: 7,
  恶: 16,
  妖精: 17,
  钢: 8,
};

export const QAttr = React.memo(function QAttr_(props: {attr: string}) {
  const marginTop = attrIndex[props.attr as '火'] * -25;
  const color = attrColors[props.attr as '火'];

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: color,
        borderRadius: 2,
        marginRight: 4,
      }}>
      <View style={{paddingHorizontal: 4, paddingVertical: 2}}>
        <View
          style={{
            width: 25,
            height: 25,
            overflow: 'hidden',
          }}>
          <Image
            source={require('../assets/imgs/attr.webp')}
            style={{width: 25, height: 525, marginTop}}></Image>
        </View>
      </View>
      <View
        style={{
          width: 50,
          backgroundColor: '#00000030',
          height: '100%',
          padding: 4,
        }}>
        <QText style={{textAlign: 'center'}}>{props.attr}</QText>
      </View>
    </View>
  );
});
