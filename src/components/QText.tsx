import {Text, TextProps, TextStyle} from 'react-native';
import {gloablStyle} from '../globalStyle';

export const QText = (props: TextProps) => {
  const {style = {}, ...rest} = props;
  return (
    <Text
      style={{
        ...gloablStyle.text,
        ...(style as TextStyle),
      }}
      {...rest}
    />
  );
};
