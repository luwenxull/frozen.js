'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const Dict_1 = __importDefault(require('./Dict'));
const List_1 = __importDefault(require('./List'));
const obj_1 = require('../tool/obj');
const is_1 = require('../tool/is');
const Collection_1 = __importDefault(require('./Collection'));
function fromFn(obj) {
  if (is_1.isObj(obj)) {
    const collection = is_1.isArray(obj)
      ? new List_1.default()
      : new Dict_1.default();
    obj_1.iterate(obj, (v, k) => {
      collection.dataSource.set(k, fromFn(v));
    });
    return collection;
  } else {
    // 非对象则直接返回
    return obj;
  }
}
/**
 * update
 *
 * @export
 * @template NoValue
 * @param {ICollection} collection
 * @param {(Key[] | Key)} path
 * @param {*} value
 * @param {NoValue} [noValue]
 * @returns {ICollection}
 */
function updateIn(collection, path, value, noValue) {
  path = [].concat(path);
  if (path.length === 1) {
    return collection.set(path[0], value, noValue);
  } else {
    const currentPath = path[0];
    const next = collection.get(currentPath);
    if (next instanceof Collection_1.default) {
      return collection.set(
        currentPath,
        updateIn(next, path.slice(1), value, noValue)
      );
    } else {
      throw new Error(`can not update on: ${next}`);
    }
  }
}
exports.updateIn = updateIn;
/**
 *
 *
 * @export
 * @template NoValue
 * @param {ICollection} collection
 * @param {(Key[] | Key)} path
 * @param {NoValue} [noValue]
 * @returns {(NoValue | any)}
 */
function getIn(collection, path, noValue) {
  path = [].concat(path);
  if (path.length === 1) {
    return collection.get(path[0], noValue);
  } else {
    const currentPath = path[0];
    const next = collection.get(currentPath);
    if (next instanceof Collection_1.default) {
      return getIn(next, path.slice(1), noValue);
    } else {
      throw new Error(`can not get on: ${next}`);
    }
  }
}
exports.getIn = getIn;
exports.from = fromFn;
