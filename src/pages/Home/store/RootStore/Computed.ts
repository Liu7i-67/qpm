import {makeAutoObservable} from '@quarkunlimit/qu-mobx';
import {IComputed} from './interface';
import {RootStore} from './';

export class Computed implements IComputed {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {}, {autoBind: true});
  }

  get countInfo() {
    const {logic} = this.rootStore;
    const info = {
      0: 0,
      1: 0,
      2: 0,
    };
    for (let i of logic.list) {
      info[i.status as 0] += 1;
    }

    info[1] = logic.list.length - info[0];

    return info;
  }

  get loading() {
    const {loadingStore} = this.rootStore;
    return loadingStore.get('init') || loadingStore.get('saveData');
  }
}
