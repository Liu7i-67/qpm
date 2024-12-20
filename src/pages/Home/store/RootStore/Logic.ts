import {makeAutoObservable} from '@quarkunlimit/qu-mobx';
import {ILogic, TLoadingStore} from './interface';
import {RootStore} from './';

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    makeAutoObservable(this, {}, {autoBind: true});
  }
}
