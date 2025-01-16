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

const styleView3: StyleProp<ViewStyle> = {
  padding: 8,
  borderWidth: 1,
  marginTop: 4,
};

export const FilterRow = observer(function FilterRow_() {
  const root = useStore();
  const {logic} = root;

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Pressable>
          <QText>搜索</QText>
        </Pressable>
        <TouchableOpacity onPress={logic.clearAll} style={styleView3}>
          <QText style={{textAlign: 'center'}}>清空过滤信息</QText>
        </TouchableOpacity>
      </View>
    </View>
  );
});
