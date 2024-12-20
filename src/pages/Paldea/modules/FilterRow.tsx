import {observer} from '@quarkunlimit/qu-mobx';
import {useStore} from '../store/RootStore';
import {
  Pressable,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
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
];

const styleView: StyleProp<ViewStyle> = {
  padding: 8,
  borderWidth: 1,
  marginTop: 4,
  flex: 1,
  borderRightWidth: 0,
};

const styleView2: StyleProp<ViewStyle> = {
  ...styleView,
  borderRightWidth: 1,
};

const styleView3: StyleProp<ViewStyle> = {
  padding: 8,
  borderWidth: 1,
  marginTop: 4,
};

export const FilterRow = observer(function FilterRow_() {
  const root = useStore();
  const {logic, global} = root;

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Pressable onPress={global.logic.backHome}>
          <QText>返回首页</QText>
        </Pressable>
        <TouchableOpacity onPress={logic.clearAll} style={styleView3}>
          <QText style={{textAlign: 'center'}}>清空标记数据</QText>
        </TouchableOpacity>
      </View>
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
            style={index === 2 ? styleView2 : styleView}>
            <View>
              <QText style={{textAlign: 'center'}}>{o.label}</QText>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
});
