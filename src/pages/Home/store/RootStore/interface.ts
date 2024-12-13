import {LoadingStore} from '@quarkunlimit/qu-mobx';
import {RootStore} from './';
import {Logic} from './Logic';
import {Computed} from './Computed';
import {GlobalStore} from '../../../../globalStore';

export type TLoadingStore = LoadingStore<'loading' | 'init' | 'saveData'>;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
}

/** 计算属性接口 */
export interface IComputed {
  rootStore: RootStore;
}

/** 根Store接口 */
export interface IRootStore {
  logic: Logic;
  computed: Computed;
  refs: IRefs;
  global: GlobalStore;
  loadingStore: TLoadingStore;
}

export interface IRefs {}

export interface IArceusMark {
  /** @param 洗翠编号 */
  no: string;
  /** @param 全国编号 */
  globalNo: string;
  /** @param 名称 */
  name: string;
  /** @param 属性 */
  attrs: string[];
  /** @param 状态 0-未捕获 1-已捕获 2-已完成 */
  status: number;
}
