import { isNull, isFn } from '../tool/is';
import { iterate } from '../tool/obj';

export type Key = string | number;
export type SetFn<T> = (current: T) => any;

export interface ICollection {
  readonly dataSource: Map<Key, any>;
  readonly size: number;
  get<NoValue>(key: Key, noValue?: NoValue): NoValue | any;
  set(key: Key, value: any): ICollection;
  set<NoValue>(
    key: Key,
    value: SetFn<NoValue | any>,
    noValue: NoValue
  ): ICollection;
  remove(key: Key): ICollection;
}

export interface ICollectionCtor<T extends Collection> {
  new (): T;
}

export default abstract class Collection implements ICollection {
  public readonly dataSource: Map<Key, any> = new Map();
  constructor() {}

  /**
   * size getter
   *
   * @readonly
   * @type {number}
   * @memberof Collection
   */
  public get size(): number {
    return this.dataSource.size;
  }

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
    } else if (typeof noValue !== 'undefined') {
      return noValue;
    } else {
      return undefined;
    }
  }

  public set(key: Key, value: any): ICollection;
  public set<NoValue>(
    key: Key,
    value: SetFn<NoValue | any>,
    noValue: NoValue
  ): ICollection;
  public set<NoValue>(
    key: Key,
    value: any | SetFn<NoValue | any>,
    noValue?: NoValue
  ): ICollection {
    const another = this.spawn();
    if (isFn(value)) {
      another.dataSource.set(key, value(this.get(key, noValue)));
    } else {
      another.dataSource.set(key, value);
    }
    return another;
  }

  /**
   * remove 方法
   *
   * @param {Key} key
   * @returns {ICollection}
   * @memberof Collection
   */
  public remove(key: Key): ICollection {
    const another = this.spawn();
    another.dataSource.delete(key);
    return another;
  }

  /**
   * 衍生
   *
   * @protected
   * @template T
   * @returns {T}
   * @memberof Collection
   */
  protected spawn(): ICollection {
    const another: ICollection = new (Object.getPrototypeOf(
      this
    )).constructor();
    iterate(this.dataSource, (v, k) => {
      // 一层copy
      another.dataSource.set(k, v);
    });
    return another;
  }
}
