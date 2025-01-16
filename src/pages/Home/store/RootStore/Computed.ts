import {makeAutoObservable} from '@quarkunlimit/qu-mobx';
import {IComputed} from './interface';
import {RootStore} from './';
import {EPage} from '../../../../interface';

export class Computed implements IComputed {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {}, {autoBind: true});
  }

  get navs() {
    return [
      {
        label: '蓝莓图鉴',
        page: EPage.Blueberry,
      },
      {
        label: '北上图鉴',
        page: EPage.Kitakami,
      },
      {
        label: '帕底亚图鉴',
        page: EPage.Paldea,
      },
      {
        label: '洗翠图鉴',
        page: EPage.Hisui,
      },
      {
        label: '帕底亚三明治图鉴',
        page: EPage.Sandwich,
      },
    ];
  }
}
