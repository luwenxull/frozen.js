'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const is_1 = require('../tool/is');
const obj_1 = require('../tool/obj');
class Collection {
  constructor() {
    this.dataSource = new Map();
  }
  /**
   * size getter
   *
   * @readonly
   * @type {number}
   * @memberof Collection
   */
  get size() {
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
  get(key, noValue) {
    if (this.dataSource.has(key)) {
      return this.dataSource.get(key);
    } else if (typeof noValue !== 'undefined') {
      return noValue;
    } else {
      return undefined;
    }
  }
  set(key, value, noValue) {
    const another = this.spawn();
    if (is_1.isFn(value)) {
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
  remove(key) {
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
  spawn() {
    const another = new (Object.getPrototypeOf(this)).constructor();
    obj_1.iterate(this.dataSource, (v, k) => {
      // 一层copy
      another.dataSource.set(k, v);
    });
    return another;
  }
}
exports.default = Collection;
