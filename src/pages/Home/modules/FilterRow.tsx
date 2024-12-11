import {observer} from '@quarkunlimit/qu-mobx';
import {useStore} from '../store/RootStore';
import {StyleProp, TouchableOpacity, View, ViewStyle} from 'react-native';
import {QText} from '../../../components/QText';

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
};
const styleView2: StyleProp<ViewStyle> = {
  ...styleView,
  borderRightWidth: 1,
};

export const FilterRow = observer(function FilterRow_() {
  const root = useStore();
  const {logic} = root;

  return (
    <View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        {options.map((o, index) => (
          <TouchableOpacity
            key={o.value}
            onPress={() => logic.changeSearch?.(o.value)}
            style={styleView}>
            <View>
              <QText>{o.label}</QText>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity onPress={logic.clearAll}>
        <View style={styleView}>
          <QText style={{textAlign: 'center'}}>清空标记数据</QText>
        </View>
      </TouchableOpacity>
    </View>
  );
});
