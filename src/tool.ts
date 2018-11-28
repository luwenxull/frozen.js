import { Arbitrary_Object, PRIMITIVE } from './const';
import { PathUnit_Simple, PathUnit_Full } from './Frozen';
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
 * 统一包装成object类型的pathunit
 *
 * @export
 * @param {(PathUnit_Simple | PathUnit_Simple[])} path
 * @returns {PathUnit_Full[]}
 */
export function toPathUnitFull(
  path: PathUnit_Simple | PathUnit_Simple[]
): PathUnit_Full[] {
  const pathArr = ([] as PathUnit_Simple[]).concat(path);
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
export function updateByPath<T extends Arbitrary_Object>(
  source: T,
  path: PathUnit_Simple[] | PathUnit_Simple,
  value: any
): T {
  const fullPathes = toPathUnitFull(path);
  let updating: Arbitrary_Object = source;
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

export function readByPath() {}
