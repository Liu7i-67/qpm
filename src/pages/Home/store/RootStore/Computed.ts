
import { makeAutoObservable } from '@quarkunlimit/qu-mobx';
import { IComputed } from './interface';
import { RootStore } from './';


export class Computed implements IComputed {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {}, { autoBind: true });
  }
}       
      