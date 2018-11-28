import { PathUnit_Simple } from '../Frozen';
import { Arbitrary_Object, PRIMITIVE } from '../const';
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
 * 判断是否是undefined
 *
 * @export
 * @param {*} value
 * @returns {value is undefined}
 */
export declare function isUndefined(value: any): value is undefined;
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
export declare function get<T extends Arbitrary_Object>(
  source: T,
  path: PathUnit_Simple[] | PathUnit_Simple,
  dft?: any
): any;
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
export declare function set<T extends Arbitrary_Object>(
  source: T,
  path: PathUnit_Simple[] | PathUnit_Simple,
  value: any
): T;
