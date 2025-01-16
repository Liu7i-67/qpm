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
  /** @parma 过滤弹窗是否可见 */
  modalVisible?: boolean;
  /** @param 三明治过滤信息 */
  filter: ISandwichFilter[];
  /** @param 当前操作的过滤项 */
  filterIndex: number;
  /** @param 用于过滤的实际搜索条件 */
  filterList: string[];
  /** @function 初始化数据 */
  init(): Promise<void>;
  /** @function 清空保存的数据 */
  clearAll(): void;
  /** @function 保存数据 */
  saveData(): Promise<void>;
  /** @function 打开过滤弹窗 */
  showModal(): void;
  /** @function 关闭过滤弹窗 */
  closeModal(): void;
  /** @function 修改当前过滤项 */
  changeFilterIndex(index: number): void;
  /** @function 获取当前编辑的项 */
  getRowAndIndex(index: number): false | {row: number; col: number};
  /** @function 修改过滤的食力 */
  chooseEffect(effect: string): void;
  /** @function 修改过滤的属性 */
  chooseAttr(attr: string): void;
  /** @function 修改过滤的等级 */
  chooseLevel(level: string): void;
  /** @function 清空过滤条件 */
  clearFilter(): void;
  /** @function 应用搜索条件 */
  toFilter(): void;
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

export interface ISandwichFilter {
  /** @param 食力 */
  effect: string;
  /** @param 属性 */
  attr: string;
  /** @param 等级 */
  level: string;
}
