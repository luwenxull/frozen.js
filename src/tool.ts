import { VALUE_OBJECT_ATRITRARY, VALUE_PRIMITIVE } from './const';
/**
 * 判断对象是否是object
 * 排除null
 *
 * @export
 * @param {(VALUE_OBJECT_ATRITRARY | VALUE_PRIMITIVE)} obj
 * @returns {obj is VALUE_OBJECT_ATRITRARY}
 */
export function isObj(
  obj: VALUE_OBJECT_ATRITRARY | VALUE_PRIMITIVE
): obj is VALUE_OBJECT_ATRITRARY {
  return typeof obj === 'object' && obj !== null;
}

/**
 * 遍历对象
 *
 * @export
 * @template T
 * @template K
 * @param {T} obj
 * @param {(value: T[K], key: K) => void} callback
 */
export function iterateObj<T, K extends keyof T>(
  obj: T,
  callback: (value: T[K], key: K) => void
) {
  for (let key of Object.keys(obj)) {
    callback(obj[key as K], key as K);
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


