import {makeAutoObservable, runInAction} from '@quarkunlimit/qu-mobx';
import {IArceusMark, ILogic, IPagination, TLoadingStore} from './interface';
import {RootStore} from './';
import initData from '../data.json';
import {Alert} from 'react-native';
import {ELocal, getLocal, saveLocal} from '../../../../utils/LocalStorage';
import {to} from '../../../../utils/tools';

const initPagination: IPagination = {
  pageSize: 20,
  index: 1,
};

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    makeAutoObservable(this, {}, {autoBind: true});
  }
}
