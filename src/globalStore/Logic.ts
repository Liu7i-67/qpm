import {makeAutoObservable} from '@quarkunlimit/qu-mobx';
import {ILogic, TLoadingStore} from './interface';
import {GlobalStore} from '.';
import {EPage} from '../interface';
export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: GlobalStore;
  loading = false;
  loadingText = '加载中...';
  currentPage: EPage = EPage.Home;

  constructor(rootStore: GlobalStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    makeAutoObservable(this, {}, {autoBind: true});
  }

  changePage(page: EPage) {
    this.currentPage = page;
  }

  backHome() {
    this.changePage(EPage.Home);
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
