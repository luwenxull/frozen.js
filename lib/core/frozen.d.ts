import { ICollection, Key } from './Collection';
export declare type Primitive = string | number | boolean | undefined | null;
declare function fromFn(obj: Primitive): Primitive;
declare function fromFn(obj: object): ICollection;
/**
 * update
 *
 * @export
 * @template NoValue
 * @param {ICollection} collection
 * @param {(Key[] | Key)} path
 * @param {*} value
 * @param {NoValue} [noValue]
 * @returns {ICollection}
 */
export declare function updateIn<NoValue>(
  collection: ICollection,
  path: Key[] | Key,
  value: any,
  noValue?: NoValue
): ICollection;
/**
 *
 *
 * @export
 * @template NoValue
 * @param {ICollection} collection
 * @param {(Key[] | Key)} path
 * @param {NoValue} [noValue]
 * @returns {(NoValue | any)}
 */
export declare function getIn<NoValue>(
  collection: ICollection,
  path: Key[] | Key,
  noValue?: NoValue
): NoValue | any;
export declare const from: typeof fromFn;
export {};
