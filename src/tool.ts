import { Arbitrary_Object, PRIMITIVE } from './const';
import { Path } from './Frozen';
/**
 * 判断对象是否是object
 * 排除null
 *
 * @export
 * @param {(Arbitrary_Object | PRIMITIVE)} obj
 * @returns {obj is Arbitrary_Object}
 */
export function isObj(
  obj: Arbitrary_Object | PRIMITIVE
): obj is Arbitrary_Object {
  return typeof obj === 'object' && obj !== null;
}

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
export function iterate<T extends Arbitrary_Object, K extends keyof T>(
  obj: T,
  callback: (value: T[K], key: K) => void
) {
  if (obj instanceof Array) {
    for (let i = 0; i < obj.length; i++) {
      callback(obj[i], i as K);
    }
  } else {
    for (let key of Object.keys(obj)) {
      callback(obj[key as K], key as K);
    }
  }
}

/**
 * 安全get函数
 *
 * @export
 * @param {any} source
 * @param {string} key
 * @returns {*}
 */
export function safeGet(source: any, key: string): any {
  if (isObj(source)) {
    return source[key];
  } else {
    throw new Error(`无法从${source}中读取属性：${key}`);
  }
}

/**
 * 根据path，更新路径上的某个值
 *
 * @export
 * @param {Arbitrary_Object} source
 * @param {Path} path
 * @param {*} value
 */
export function updateByPath<T extends Arbitrary_Object>(
  source: T,
  path: Path,
  value: any
): T {
  const fullPath = ([] as Array<string | number>).concat(path);
  let updating: Arbitrary_Object = source;
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
