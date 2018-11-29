import Collection, { Key } from './Collection';
import { isFn } from './tool/is';

export default class Dict extends Collection {
  public set<T>(key: Key, value: T): Dict {
    const another = Dict.spawn(this, Dict);
    if (isFn(value)) {
      another.dataSource.set(key, value(this.get(key)));
    } else {
      another.dataSource.set(key, value);
    }
    return new Dict();
  }
}
