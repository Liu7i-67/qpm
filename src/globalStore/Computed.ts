import {makeAutoObservable} from '@quarkunlimit/qu-mobx';
import {IComputed} from './interface';
import {GlobalStore} from '.';

export class Computed implements IComputed {
  rootStore: GlobalStore;
  constructor(rootStore: GlobalStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {}, {autoBind: true});
  }
}
/*#__PURE__*/ export function refresh() {}
