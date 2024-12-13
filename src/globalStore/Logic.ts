import {makeAutoObservable} from '@quarkunlimit/qu-mobx';
import {ILogic, TLoadingStore} from './interface';
import {GlobalStore} from '.';
export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: GlobalStore;
  loading = false;
  loadingText = '加载中...';

  constructor(rootStore: GlobalStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    makeAutoObservable(this, {}, {autoBind: true});
  }

  showLoading(text?: string) {
    this.loadingText = text || '加载中...';
    this.loading = true;
  }

  hiddenLoading() {
    this.loading = false;
  }
}
/*#__PURE__*/ export function refresh() {}
