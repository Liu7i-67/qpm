import {makeAutoObservable, runInAction} from '@quarkunlimit/qu-mobx';
import {
  ISandwich,
  ILogic,
  IPagination,
  TLoadingStore,
  ISandwichFilter,
} from './interface';
import {RootStore} from './';
import {Alert} from 'react-native';
import {ELocal, getLocal, saveLocal} from '../../../../utils/LocalStorage';
import {showConsole, to} from '../../../../utils/tools';
import initData from '../../../../assets/json/sandwich.json';

const initPagination: IPagination = {
  pageSize: 20,
  index: 1,
};

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  list: ISandwich[] = [];
  pagination: IPagination = {
    ...initPagination,
  };
  modalVisible = false;
  filter: ISandwichFilter[] = [];
  filterIndex: number = -1;
  filterList: string[] = [];

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    makeAutoObservable(this, {}, {autoBind: true});
  }

  async init() {
    const {global} = this.rootStore;
    global.logic.showLoading('数据加载中...');
    const [err, old] = await to(getLocal(ELocal.SandwichDex));
    runInAction(() => {
      if (!err && Array.isArray(old?.list) && old.list.length > 0) {
        this.list = old.list;
      } else if (initData) {
        this.list = initData;
      }

      global.logic.hiddenLoading();
    });
  }

  clearAll() {
    this.clearFilter();
    this.toFilter();
  }

  async saveData() {
    const {global} = this.rootStore;
    global.logic.showLoading('数据保存中...');
    await saveLocal(ELocal.SandwichDex, {
      list: this.list,
    });
    runInAction(() => {
      global.logic.hiddenLoading();
    });
  }

  showMore() {
    const {computed} = this.rootStore;
    if (!computed.haveMore) {
      return;
    }
    this.pagination.index = this.pagination.index + 1;
  }

  showModal() {
    this.modalVisible = true;
  }

  closeModal() {
    this.modalVisible = false;
  }

  changeFilterIndex(index: number) {
    this.filterIndex = index;
  }

  getRowAndIndex(index: number) {
    const row = Math.floor(index / 3);
    const col = index % 3;
    if (row < 0 || row > 2) {
      return false;
    }

    return {row, col};
  }

  clearFilter() {
    this.filter = [];
  }

  chooseEffect(effect: string) {
    if (this.filter.find(e => e.effect === effect)) {
      return;
    }

    const stats = this.getRowAndIndex(this.filterIndex);

    if (this.filter.length < 3 && (!stats || (stats && stats?.col !== 0))) {
      this.filter.push({
        effect,
        attr: '',
        level: '',
      });
      this.filterIndex = (this.filter.length - 1) * 3 + 1;
      return;
    }

    if (!stats || stats.col !== 0) {
      return;
    }
    this.filter[stats.row].effect = effect;
    if (effect === '蛋蛋力') {
      this.filterIndex = -1;
    }
  }

  chooseAttr(attr: string) {
    if (this.filterIndex < 0) {
      return;
    }

    const stats = this.getRowAndIndex(this.filterIndex);

    if (!stats || stats.col !== 1) {
      return;
    }
    this.filter[stats.row].attr = attr;
    this.filterIndex += 1;
  }

  chooseLevel(level: string) {
    if (this.filterIndex < 0) {
      return;
    }

    const stats = this.getRowAndIndex(this.filterIndex);

    if (!stats || stats.col !== 2) {
      return;
    }
    this.filter[stats.row].level = level;
  }

  toFilter() {
    const {refs} = this.rootStore;
    this.closeModal();
    const filters: string[] = [];
    for (let f of this.filter) {
      if (!f.effect) {
        continue;
      }
      let filter = f.effect;

      if (f.effect === '蛋蛋力') {
        filters.push(filter);
        continue;
      }
      if (f.attr) {
        filter += `：${f.attr}`;
      }
      if (f.level) {
        filter += ` ${f.level}`;
      }
      filters.push(filter);
    }
    this.filterList = filters;
    this.pagination.index = 1;
    refs.listRef.current?.scrollToOffset?.({
      offset: 0,
    });
  }
}
