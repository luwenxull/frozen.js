import { PathUnit_Simple } from '../Frozen';
import { toPathUnitFull } from './frozenHelper';
import { Arbitrary_Object, PRIMITIVE } from '../const';

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
 * 判断是否是undefined
 *
 * @export
 * @param {*} value
 * @returns {value is undefined}
 */
export function isUndefined(value: any): value is undefined {
  return typeof value === 'undefined';
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
export function get<T extends Arbitrary_Object>(
  source: T,
  path: PathUnit_Simple[] | PathUnit_Simple,
  dft?: any
): any {
  let waitingRead: Arbitrary_Object = source;
  for (let { name } of toPathUnitFull(path)) {
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
export function set<T extends Arbitrary_Object>(
  source: T,
  path: PathUnit_Simple[] | PathUnit_Simple,
  value: any
): T {
  const fullPathes = toPathUnitFull(path);
  let waitingUpdate: Arbitrary_Object = source;
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
