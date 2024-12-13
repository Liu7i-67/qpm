import {
  createContainer,
  LoadingStore,
  makeAutoObservable,
  useLocalObservable,
} from '@quarkunlimit/qu-mobx';
import {IArceusMark, IRefs, IRootStore, TLoadingStore} from './interface';
import {Logic} from './Logic';
import {Computed} from './Computed';
import {
  GlobalStore,
  useStore as useGloabl,
} from '../../../../globalStore/index';
import {useRef} from 'react';
import {FlatList} from 'react-native';

export class RootStore implements IRootStore {
  logic: Logic;
  computed: Computed;
  loadingStore: TLoadingStore;
  refs: IRefs;
  global: GlobalStore;
  constructor(global: GlobalStore, refs: IRefs) {
    this.global = global;
    this.refs = refs;
    this.loadingStore = new LoadingStore();
    this.logic = new Logic(this);
    this.computed = new Computed(this);
    makeAutoObservable(this, {refs: false, global: false}, {autoBind: true});
  }
}

export const {Provider, useStore} = createContainer(() => {
  const global = useGloabl();
  const listRef = useRef<FlatList<IArceusMark>>(null);
  return useLocalObservable(() => new RootStore(global, {listRef}));
});
