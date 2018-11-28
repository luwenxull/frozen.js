'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const frozenHelper_1 = require('./frozenHelper');
/**
 * 判断对象是否是object
 * 排除null
 *
 * @export
 * @param {(Arbitrary_Object | PRIMITIVE)} obj
 * @returns {obj is Arbitrary_Object}
 */
function isObj(obj) {
  return typeof obj === 'object' && obj !== null;
}
exports.isObj = isObj;
/**
 * 判断是否是undefined
 *
 * @export
 * @param {*} value
 * @returns {value is undefined}
 */
function isUndefined(value) {
  return typeof value === 'undefined';
}
exports.isUndefined = isUndefined;
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
  if (obj instanceof Array) {
    for (let i = 0; i < obj.length; i++) {
      callback(obj[i], i);
    }
  } else {
    for (let key of Object.keys(obj)) {
      callback(obj[key], key);
    }
  }
}
exports.iterate = iterate;
/**
 * 安全get函数
 *
 * @export
 * @param {any} source
 * @param {string} key
 * @returns {*}
 */
function get(source, path, dft) {
  let waitingRead = source;
  for (let { name } of frozenHelper_1.toPathUnitFull(path)) {
    if (isObj(waitingRead)) {
      waitingRead = waitingRead[name];
    } else {
      if (!isUndefined(dft)) {
        return dft;
      } else {
        return undefined;
      }
    }
  }
  return waitingRead;
}
exports.get = get;
/**
 * 根据path，更新路径上的某个值
 *
 * @export
 * @template T
 * @param {T} source
 * @param {PathUnit_Simple[]} path
 * @param {*} value
 * @returns {T}
 */
function set(source, path, value) {
  const fullPathes = frozenHelper_1.toPathUnitFull(path);
  let waitingUpdate = source;
  fullPathes.forEach((path, i) => {
    let { name, dft } = path;
    if (i === fullPathes.length - 1 /* 遍历到达最后一层 */) {
      if (!isObj(waitingUpdate)) {
        throw new Error(`${waitingUpdate}非对象类型，无法更新字段：${name}`);
      }
      waitingUpdate[name] = value;
    } else {
      if (Object.prototype.hasOwnProperty.call(waitingUpdate, name)) {
        const nextUpdate = waitingUpdate[name];
        if (isObj(nextUpdate)) {
          waitingUpdate = nextUpdate;
        } else {
          throw new Error(`${nextUpdate}非对象类型，无法更新字段：${name}`);
        }
      } else {
        if (isObj(dft)) {
          waitingUpdate[name] = dft; // 如果提供了默认值，自动赋值
          waitingUpdate = dft;
        } else {
          // 缺失该字段，未提供默认值，并且尚未到达最后一层
          // 非对象类型的默认值会被忽略
          throw new Error(`${JSON.stringify(waitingUpdate)}缺失字段：${name}`);
        }
      }
    }
  });
  return source;
}
exports.set = set;
