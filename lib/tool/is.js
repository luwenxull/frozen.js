'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function isNull(v) {
  return v === null;
}
exports.isNull = isNull;
/**
 * 排除null
 *
 * @export
 * @param {*} v
 * @returns {v is object}
 */
function isObj(v) {
  return typeof v === 'object' && !isNull(v);
}
exports.isObj = isObj;
function isFn(v) {
  return typeof v === 'function';
}
exports.isFn = isFn;
function isArray(v) {
  return v instanceof Array;
}
exports.isArray = isArray;
function isUndef(v) {
  return typeof v === 'undefined';
}
exports.isUndef = isUndef;
function isMap(v) {
  return v instanceof Map;
}
exports.isMap = isMap;
