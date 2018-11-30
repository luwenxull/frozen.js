import Collection, { Key, SetFn } from './Collection';
import { isFn } from '../tool/is';

export default class List extends Collection {
  public set<T>(key: Key, value: T): List;
  public set<T, K>(key: Key, value: SetFn<T | K>, noValue: T): List;
  public set<T, K>(key: Key, value: T | SetFn<T | K>, noValue?: K): List {
    const another = List.spawn(this, List);
    if (isFn(value)) {
      another.dataSource.set(key, value(this.get(key, noValue)));
    } else {
      another.dataSource.set(key, value);
    }
    return another;
  }
}
