export type Arbitrary_Object = {
  [prop: string]: any;
};

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
      callback(obj[key], key as K);
    }
  }
}
