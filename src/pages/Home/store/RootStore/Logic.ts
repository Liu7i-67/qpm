import {makeAutoObservable, runInAction} from '@quarkunlimit/qu-mobx';
import {IArceusMark, ILogic, TLoadingStore} from './interface';
import {RootStore} from './';
import initData from '../data.json';
import {Alert} from 'react-native';
import {ELocal, getLocal, saveLocal} from '../../../../utils/LocalStorage';

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  count = 0;
  list: IArceusMark[] = [];
  showList: IArceusMark[] = [];
  status = -1;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    makeAutoObservable(this, {}, {autoBind: true});
  }

  addItem() {
    this.count = this.count + 1;
  }

  async init() {
    const old = await getLocal(ELocal.ArceusMarkItem);
    runInAction(() => {
      if (Array.isArray(old.list) && old.list.length > 0) {
        this.list = old.list;
        this.status = old.status ?? -1;
      } else {
        this.list = initData.map(i => {
          return {
            ...i,
            status: 0,
          };
        });
      }

      this.getShowList();
    });
  }

  getShowList() {
    if (this.status === -1) {
      this.showList = this.list;
    } else if (this.status === 1) {
      this.showList = this.list.filter(i => i.status !== 0);
    } else {
      this.showList = this.list.filter(i => i.status === this.status);
    }
  }

  changeSearch(status: number) {
    this.status = status ?? -1;
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
    await saveLocal(ELocal.ArceusMarkItem, {
      list: this.list,
      status: this.status,
    });
    this.getShowList();
  }
}
