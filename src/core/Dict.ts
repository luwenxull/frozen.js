import Collection, { Key, SetFn } from './Collection';
import { isFn } from '../tool/is';

export default class Dict extends Collection {
  public set<T>(key: Key, value: T): Dict;
  public set<T, K>(key: Key, value: SetFn<T | K>, noValue: T): Dict;
  public set<T, K>(key: Key, value: T | SetFn<T | K>, noValue?: K): Dict {
    const another = Dict.spawn(this, Dict);
    if (isFn(value)) {
      another.dataSource.set(key, value(this.get(key, noValue)));
    } else {
      another.dataSource.set(key, value);
    }
    return another;
  }
}
