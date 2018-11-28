'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const object_1 = require('./object');
/**
 * 统一包装成object类型的pathunit
 *
 * @export
 * @param {(PathUnit_Simple | PathUnit_Simple[])} path
 * @returns {PathUnit_Full[]}
 */
function toPathUnitFull(path) {
  const pathArr = [].concat(path);
  return pathArr.map(path => {
    if (object_1.isObj(path)) {
      return path;
    } else {
      return {
        name: path
      };
    }
  });
}
exports.toPathUnitFull = toPathUnitFull;
