
import {
  createContainer,
  LoadingStore,
  useLocalObservable
} from '@quarkunlimit/qu-mobx';
import { IGlobalStore, TLoadingStore } from './interface';
import { Logic } from './Logic';
import { Computed } from './Computed';


export class GlobalStore implements IGlobalStore {
  logic: Logic;
  computed: Computed;
  loadingStore:TLoadingStore;
  constructor() {
    this.loadingStore = new LoadingStore()
    this.logic = new Logic(this);
    this.computed = new Computed(this);
  }
}

export const { Provider, useStore } = createContainer(() =>
  useLocalObservable(() => new GlobalStore())
);
  
  