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
 * 根据path，更新路径上的某个值
 *
 * @export
 * @param {Arbitrary_Object} source
 * @param {Path} path
 * @param {*} value
 */
function updateByPath(source, path, value) {
  const fullPath = [].concat(path);
  let updating = source;
  fullPath.forEach((path, i) => {
    if (i === fullPath.length - 1 /* 遍历到达最后一层 */) {
      updating[path] = value;
    } else {
      if (Object.prototype.hasOwnProperty.call(updating, path)) {
        const deeper = updating[path];
        if (isObj(deeper)) {
          updating = deeper;
        } else {
          throw new Error(`无法更新路径：${fullPath}`);
        }
      } else {
        throw new Error(`无法更新路径：${fullPath}`);
      }
    }
  });
  return source;
}
exports.updateByPath = updateByPath;
