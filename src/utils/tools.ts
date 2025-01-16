import {Alert} from 'react-native';

export function to<T, U = Error>(
  promise: Promise<T>,
  errorExt?: object,
): Promise<[U | null, T | undefined]> {
  return promise
    .then<[null, T]>((data: T) => [null, data])
    .catch<[U, undefined]>((err: U) => {
      if (errorExt) {
        Object.assign(err as any, errorExt);
      }

      return [err, undefined];
    });
}

/** @function 输出测试-debug使用 */
export const showConsole = (msg: string) => {
  Alert.alert(
    '测试', // 标题
    msg, // 消息内容
    [
      {
        text: '取消',
        style: 'cancel', // 取消按钮的样式
      },
    ],
    {cancelable: true}, // 是否可以通过点击外部区域取消弹窗
  );
};
