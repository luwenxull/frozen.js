export declare type Key = string | number;
export declare type SetFn<T> = (current: T) => any;
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
  readonly dataSource: Map<Key, any>;
  constructor();
  /**
   * size getter
   *
   * @readonly
   * @type {number}
   * @memberof Collection
   */
  readonly size: number;
  /**
   * get method
   *
   * @template NoValue
   * @param {Key} key
   * @param {NoValue} [noValue]
   * @returns {(NoValue | any)}
   * @memberof Collection
   */
  get<NoValue>(key: Key, noValue?: NoValue): NoValue | any;
  set(key: Key, value: any): ICollection;
  set<NoValue>(
    key: Key,
    value: SetFn<NoValue | any>,
    noValue: NoValue
  ): ICollection;
  /**
   * remove 方法
   *
   * @param {Key} key
   * @returns {ICollection}
   * @memberof Collection
   */
  remove(key: Key): ICollection;
  /**
   * 衍生
   *
   * @protected
   * @template T
   * @returns {T}
   * @memberof Collection
   */
  protected spawn(): ICollection;
}
