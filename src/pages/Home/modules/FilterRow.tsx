import {observer} from '@quarkunlimit/qu-mobx';
import {useStore} from '../store/RootStore';
import {StyleProp, Text, TouchableOpacity, View, ViewStyle} from 'react-native';

const options = [
  {
    label: '全部',
    value: -1,
  },
  {
    label: '未捕获',
    value: 0,
  },
  {
    label: '已捕获',
    value: 1,
  },
  {
    label: '研究完成',
    value: 2,
  },
  {
    label: '研究未完成',
    value: 3,
  },
];

const styleView: StyleProp<ViewStyle> = {
  padding: 8,
  borderWidth: 1,
  marginTop: 4,
  borderRightWidth: 0,
};

export const FilterRow = observer(function FilterRow_() {
  const root = useStore();
  const {logic} = root;

  return (
    <View>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        {options.map((o, index) => (
          <TouchableOpacity
            key={o.value}
            onPress={() => logic.changeSearch?.(o.value)}>
            <View style={styleView}>
              <Text>{o.label}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity onPress={logic.clearAll} style={styleView}>
        <View>
          <Text>清空标记数据</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
});
