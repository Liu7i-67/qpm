import {LoadingStore} from '@quarkunlimit/qu-mobx';
import {RootStore} from './';
import {Logic} from './Logic';
import {Computed} from './Computed';
import {GlobalStore} from '../../../../globalStore';
import {FlatList} from 'react-native';

export type TLoadingStore = LoadingStore<'loading' | 'init' | 'saveData'>;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 分页信息 */
  pagination: IPagination;
  /** @param 数据源 */
  list: ISandwich[];
  /** @function 初始化数据 */
  init(): Promise<void>;
  /** @function 清空保存的数据 */
  clearAll(): void;
  /** @function 保存数据 */
  saveData(): Promise<void>;
}

/** 计算属性接口 */
export interface IComputed {
  rootStore: RootStore;
  /** @param 符合筛选跳转的数据源 */
  showList: ISandwich[];
  /** @param 分页展示的数据源 */
  dataSource: ISandwich[];
}

/** 根Store接口 */
export interface IRootStore {
  logic: Logic;
  computed: Computed;
  refs: IRefs;
  global: GlobalStore;
  loadingStore: TLoadingStore;
}

export interface IRefs {
  listRef: React.MutableRefObject<FlatList<ISandwich> | null>;
}

export interface ISandwich {
  /** @param 食物名称 */
  name: string;
  /** @param 食材信息 */
  food: string;
  /** @param 调味料信息 */
  herba: string;
  /** @param 食力信息 */
  effect: string;
  /** @param 获取方式 */
  method: string;
  id: number;
  /** @param 可购地区 */
  price?: number;
  /** @param 可购商铺 */
  place?: IPlace[];
}

export interface IPlace {
  place: string;
  shop: string[];
}

export interface IPagination {
  /** @param 每页条目 */
  pageSize: number;
  /** @param 当前页码 */
  index: number;
}
