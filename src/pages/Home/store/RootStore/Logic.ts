import {makeAutoObservable} from '@quarkunlimit/qu-mobx';
import {IArceusMark, ILogic, TLoadingStore} from './interface';
import {RootStore} from './';
import initData from '../data.json';

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  count = 0;
  list: IArceusMark[] = [];
  showList: IArceusMark[] = [];
  status = -1;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    makeAutoObservable(this, {}, {autoBind: true});
  }

  addItem() {
    this.count = this.count + 1;
  }

  async init() {
    this.list = initData.map(i => {
      return {
        ...i,
        status: 0,
      };
    });
    this.getShowList();
  }

  getShowList() {
    if (this.status === -1) {
      this.showList = this.list;
    } else if (this.status === 1) {
      this.showList = this.list.filter(i => i.status !== 0);
    } else {
      this.showList = this.list.filter(i => i.status === this.status);
    }
  }
}
