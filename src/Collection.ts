import { isNull } from './tool/is';

export type Key = string | number;

export interface ICollection {
  get<T>(key: Key): T | undefined;
  get<T, U>(key: Key, noValue: U): T | U;
  set<T>(key: Key, value: T): ICollection;
}

export interface ICollectionCtor<T extends Collection> {
  new (): T;
}

export default abstract class Collection implements ICollection {
  protected dataSource: Map<Key, any> = new Map();
  protected derivedFrom: ICollection | null = null;
  constructor() {}

  public get<T>(key: Key): T | undefined;
  public get<T, U>(key: Key, noValue: U): T | U;

  /**
   *
   *
   * @template T
   * @template U
   * @param {Key} key
   * @param {U} [noValue]
   * @returns {(T | U | undefined)}
   * @memberof Collection
   */
  public get<T, U>(key: Key, noValue?: U): T | U | undefined {
    if (this.dataSource.has(key)) {
      return this.dataSource.get(key);
    } else if (!isNull(this.derivedFrom)) {
      return this.derivedFrom.get<T, U>(key, noValue as U);
    } else if (typeof noValue !== 'undefined') {
      return noValue;
    } else {
      return undefined;
    }
  }

  public abstract set<T>(key: Key, value: T): ICollection;

  static spawn<T extends Collection>(from: T, ctor: ICollectionCtor<T>): T {
    const another = new ctor();
    another.derivedFrom = from;
    return another;
  }
}
