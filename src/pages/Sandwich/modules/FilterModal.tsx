import {observer, transaction} from '@quarkunlimit/qu-mobx';
import {useStore} from '../store/RootStore';
import {QText} from '../../../components/QText';
import {QDrawer} from '../../../components/QDrawer';
import {Pressable, StyleProp, View, ViewStyle} from 'react-native';
import {QAttr} from '../../../components/QAttr';
import {globalColor} from '../../../globalStyle';
import {QIcon} from '../../../components/QIcon';

const effectList = [
  '遭遇力',
  '蛋蛋力',
  '捕获力',
  '经验力',
  '掉物力',
  '团战力',
  '称号力',
  '闪耀力',
  '大大力',
  '小小力',
];

const attrList = [
  '一般',
  '火',
  '水',
  '草',
  '电',
  '格斗',
  '飞行',
  '毒',
  '虫',
  '岩石',
  '地面',
  '超能力',
  '冰',
  '龙',
  '幽灵',
  '恶',
  '妖精',
  '钢',
];

const LevelList = ['Lv.1', 'Lv.2', 'Lv.3'];

const effectStyle: StyleProp<ViewStyle> = {
  padding: 4,
  borderWidth: 1,
  borderRadius: 4,
  width: 60,
};

export const FilterHightlight = observer(function FilterHightlight_(props: {
  children?: React.ReactNode;
  index: number;
}) {
  const root = useStore();
  const {logic} = root;
  return (
    <Pressable
      style={{
        borderColor:
          logic.filterIndex === props.index
            ? globalColor.hightLight
            : globalColor.null,
        borderWidth: 2,
        width: 'auto',
        padding: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 40,
      }}
      onPress={() => {
        logic.changeFilterIndex(props.index);
      }}>
      {props.children}
    </Pressable>
  );
});

export const FilterModal = observer(function FilterModal_() {
  const root = useStore();
  const {logic} = root;

  return (
    <QDrawer visible={logic.modalVisible} onRequestClose={logic.closeModal}>
      <View
        style={{
          flexWrap: 'wrap',
          height: 420,
          gap: 8,
          borderBottomWidth: 1,
          padding: 8,
        }}>
        {effectList.map(e => {
          return (
            <Pressable
              key={e}
              style={effectStyle}
              onPress={() => logic.chooseEffect(e)}>
              <QText style={{fontSize: 16}}>{e}</QText>
            </Pressable>
          );
        })}
        {attrList.map(e => {
          return (
            <Pressable key={e} onPress={() => logic.chooseAttr(e)}>
              <QAttr attr={e} style={{marginRight: 0}} />
            </Pressable>
          );
        })}
        {LevelList.map(e => {
          return (
            <Pressable
              key={e}
              onPress={() => logic.chooseLevel(e)}
              style={{
                padding: 4,
                borderWidth: 1,
                borderRadius: 4,
                width: 82,
              }}>
              <QText style={{fontSize: 16, textAlign: 'center'}}>{e}</QText>
            </Pressable>
          );
        })}
      </View>
      <View style={{padding: 8, gap: 8}}>
        {!logic.filter.length && <QText>请选择食力</QText>}
        {logic.filter.map((f, index) => {
          return (
            <View
              style={{
                flexDirection: 'row',
                gap: 8,
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
              key={index}>
              <FilterHightlight index={index * 3}>
                <View style={effectStyle}>
                  <QText style={{fontSize: 16}}>{f.effect || '食力'}</QText>
                </View>
              </FilterHightlight>
              {f.effect !== '蛋蛋力' && (
                <FilterHightlight index={index * 3 + 1}>
                  <View style={{width: 82}}>
                    {f.attr && <QAttr attr={f.attr} style={{marginRight: 0}} />}
                    {!f.attr && <QText>请选择属性</QText>}
                  </View>
                </FilterHightlight>
              )}
              {f.effect !== '蛋蛋力' && (
                <FilterHightlight index={index * 3 + 2}>
                  <View style={{width: 82}}>
                    <QText style={{textAlign: 'center'}}>
                      {f.level || '请选择等级'}
                    </QText>
                  </View>
                </FilterHightlight>
              )}
            </View>
          );
        })}
      </View>
      <View style={{flexDirection: 'row', padding: 8, gap: 8}}>
        <Pressable
          onPress={logic.clearFilter}
          style={{
            flexDirection: 'row',
            padding: 8,
            borderWidth: 1,
            alignItems: 'center',
            borderRadius: 4,
          }}>
          <QIcon type="delete" />
          <QText>清空条件</QText>
        </Pressable>
        <Pressable
          onPress={logic.toFilter}
          style={{
            flexDirection: 'row',
            padding: 8,
            borderWidth: 1,
            alignItems: 'center',
            borderRadius: 4,
            flex: 1,
            justifyContent: 'center',
          }}>
          <QIcon type="search" />
          <QText>搜索</QText>
        </Pressable>
      </View>
    </QDrawer>
  );
});
