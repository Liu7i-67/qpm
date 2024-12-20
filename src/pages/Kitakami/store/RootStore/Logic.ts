import {makeAutoObservable, runInAction} from '@quarkunlimit/qu-mobx';
import {IArceusMark, ILogic, IPagination, TLoadingStore} from './interface';
import {RootStore} from './';
import {Alert} from 'react-native';
import {ELocal, getLocal, saveLocal} from '../../../../utils/LocalStorage';
import {to} from '../../../../utils/tools';
import initData from '../../../../assets/json/bs.json';

const initPagination: IPagination = {
  pageSize: 20,
  index: 1,
};

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  list: IArceusMark[] = [];
  status = -1;
  pagination: IPagination = {
    ...initPagination,
  };

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    makeAutoObservable(this, {}, {autoBind: true});
  }

  async init() {
    const {global} = this.rootStore;
    global.logic.showLoading('数据加载中...');
    const [err, old] = await to(getLocal(ELocal.KitakamiDex));
    runInAction(() => {
      if (!err && Array.isArray(old?.list) && old.list.length > 0) {
        this.list = old.list;
        this.status = old.status ?? -1;
      } else if (initData) {
        this.list = initData.map(i => {
          return {
            ...i,
            status: 0,
            imageNo: i.index,
          };
        });
      }

      global.logic.hiddenLoading();
    });
  }

  changeSearch(status: number) {
    this.status = status ?? -1;
    this.pagination.index = 1;
    this.saveData();
  }

  clearAll() {
    Alert.alert(
      '确认清空', // 标题
      '即将清空标记的数据，是否确认继续？', // 消息内容
      [
        {
          text: '取消',
          style: 'cancel', // 取消按钮的样式
        },
        {
          text: '确定',
          onPress: () => {
            runInAction(() => {
              this.list = initData.map(i => {
                return {
                  ...i,
                  status: 0,
                  imageNo: i.index,
                };
              });

              this.saveData();
            });
          },
          style: 'destructive', // 确定按钮的样式（通常用于危险操作）
        },
      ],
      {cancelable: true}, // 是否可以通过点击外部区域取消弹窗
    );
  }
  changeStatus(item: IArceusMark, status: number) {
    this.list = this.list.map(i => {
      if (i.no === item.no) {
        return {
          ...i,
          status: status || 0,
        };
      }

      return i;
    });
    this.saveData();
  }

  async saveData() {
    const {global} = this.rootStore;
    global.logic.showLoading('数据保存中...');
    await saveLocal(ELocal.KitakamiDex, {
      list: this.list,
      status: this.status,
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
}
