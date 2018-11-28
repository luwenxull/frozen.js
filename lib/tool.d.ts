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
 * 统一包装成object类型的pathunit
 *
 * @export
 * @param {(PathUnit_Simple | PathUnit_Simple[])} path
 * @returns {PathUnit_Full[]}
 */
export declare function toPathUnitFull(
  path: PathUnit_Simple | PathUnit_Simple[]
): PathUnit_Full[];
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
export declare function updateByPath<T extends Arbitrary_Object>(
  source: T,
  path: PathUnit_Simple[] | PathUnit_Simple,
  value: any
): T;
export declare function readByPath(): void;
