export declare type Arbitrary_Object = {
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
export declare function iterate<
  T extends object & Arbitrary_Object,
  K extends keyof T
>(obj: T, callback: (value: T[K], key: K) => void): void;
