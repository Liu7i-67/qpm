import {LoadingStore} from '@quarkunlimit/qu-mobx';
import {GlobalStore} from '.';
import {Logic} from './Logic';
import {Computed} from './Computed';
import {EPage} from '../interface';

export type TLoadingStore = LoadingStore<'loading'>;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: GlobalStore;
  /** @param 全局的loading弹窗 */
  loading: boolean;
  /** @param loading弹窗提示的文字 */
  loadingText: string;
  /** @param 当前展示的页面 */
  currentPage: EPage;
  /** @function 切换当前展示的页面 */
  changePage(page: EPage): void;
  /** @function 打开弹窗 */
  showLoading(text?: string): void;
  /** @function 关闭弹窗 */
  hiddenLoading(): void;
  /** @function 返回首页 */
  backHome(): void;
}

/** 计算属性接口 */
export interface IComputed {
  rootStore: GlobalStore;
}

/** 根Store接口 */
export interface IGlobalStore {
  logic: Logic;
  computed: Computed;
  loadingStore: TLoadingStore;
}
