'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
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
function safeGet(source, key) {
  if (isObj(source)) {
    return source[key];
  } else {
    throw new Error(`无法从${source}中读取属性：${key}`);
  }
}
exports.safeGet = safeGet;
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
    if (isObj(path)) {
      return path;
    } else {
      return {
        name: path
      };
    }
  });
}
exports.toPathUnitFull = toPathUnitFull;
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
function updateByPath(source, path, value) {
  const fullPathes = toPathUnitFull(path);
  let updating = source;
  fullPathes.forEach((path, i) => {
    let { name, dft } = path;
    if (i === fullPathes.length - 1 /* 遍历到达最后一层 */) {
      updating[name] = value;
    } else {
      if (Object.prototype.hasOwnProperty.call(updating, name)) {
        const nextUpdating = updating[name];
        if (isObj(nextUpdating)) {
          updating = nextUpdating;
        } else {
          throw new Error(`${nextUpdating}非对象类型，无法更新字段：${name}`);
        }
      } else {
        throw new Error(`${JSON.stringify(updating)}缺失字段：${name}`);
      }
    }
  });
  return source;
}
exports.updateByPath = updateByPath;
function readByPath() {}
exports.readByPath = readByPath;
