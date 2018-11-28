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
export declare function isObj(
  obj: Arbitrary_Object | PRIMITIVE
): obj is Arbitrary_Object;
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
export declare function iterate<T extends Arbitrary_Object, K extends keyof T>(
  obj: T,
  callback: (value: T[K], key: K) => void
): void;
/**
 * 安全get函数
 *
 * @export
 * @param {any} source
 * @param {string} key
 * @returns {*}
 */
export declare function safeGet(source: any, key: string): any;
/**
 * 根据path，更新路径上的某个值
 *
 * @export
 * @param {Arbitrary_Object} source
 * @param {Path} path
 * @param {*} value
 */
export declare function updateByPath<T extends Arbitrary_Object>(
  source: T,
  path: Path,
  value: any
): T;
