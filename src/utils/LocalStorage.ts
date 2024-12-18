import AsyncStorage from '@react-native-async-storage/async-storage';

export enum ELocal {
  /** @param 阿尔宙斯信息 */
  ArceusMarkItem = 'ArceusMarkItem',
}

export const saveLocal = (key: ELocal, value: any) => {
  let val = value;
  if (typeof value !== 'string') {
    val = JSON.stringify(val);
  }
  return AsyncStorage.setItem(key, val);
};

export const getLocal = async (key: ELocal) => {
  const value = await AsyncStorage.getItem(key);
  if (!value) {
    return value;
  }
  try {
    return JSON.parse(value);
  } catch (error) {
    return value;
  }
};

export const removeLocal = (key: ELocal) => {
  return AsyncStorage.removeItem(key);
};
