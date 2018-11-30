'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const is_1 = require('./is');
/**
 * 遍历
 * 支持普通对象和数组
 *
 * @export
 * @template T
 * @template K
 * @param {T} obj
 * @param {(value: T[K], key: K) => void} callback
 */
function iterate(obj, callback) {
  if (is_1.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      callback(obj[i], i);
    }
  } else if (is_1.isMap(obj)) {
    for (let [key, value] of obj) {
      callback(value, key);
    }
  } else {
    for (let key of Object.keys(obj)) {
      callback(obj[key], key);
    }
  }
}
exports.iterate = iterate;
