import { isNull } from '../tool/is';

export type Key = string | number;
export type SetFn<T> = (current: T) => any;

export interface ICollection {
  dataSource: Map<Key, any>;
  get<NoValue>(key: Key, noValue?: NoValue): NoValue | any;
  set<T>(key: Key, value: T): ICollection;
  set<T, K>(key: Key, value: SetFn<T | K>, noValue: T): ICollection;
}

export interface ICollectionCtor<T extends Collection> {
  new (): T;
}

export default abstract class Collection implements ICollection {
  public dataSource: Map<Key, any> = new Map();
  protected derivedFrom: ICollection | null = null;
  constructor() {}

  // get<Expect>(key: Key): Expect | undefined;
  // get<Expect, NoValue>(key: Key, noValue: NoValue): Expect | NoValue;

  /**
   * get method
   *
   * @template NoValue
   * @param {Key} key
   * @param {NoValue} [noValue]
   * @returns {(NoValue | any)}
   * @memberof Collection
   */
  public get<NoValue>(key: Key, noValue?: NoValue): NoValue | any {
    if (this.dataSource.has(key)) {
      return this.dataSource.get(key);
    } else if (!isNull(this.derivedFrom)) {
      return this.derivedFrom.get(key, noValue);
    } else if (typeof noValue !== 'undefined') {
      return noValue;
    } else {
      return undefined;
    }
  }

  public abstract set<T>(key: Key, value: T): ICollection;
  public abstract set<T, K>(
    key: Key,
    value: SetFn<T | K>,
    noValue: T
  ): ICollection;

  /**
   * 衍生
   *
   * @static
   * @template T
   * @param {T} from
   * @param {ICollectionCtor<T>} ctor
   * @returns {T}
   * @memberof Collection
   */
  static spawn<T extends Collection>(from: T, ctor: ICollectionCtor<T>): T {
    const another = new ctor();
    another.derivedFrom = from;
    return another;
  }
}
