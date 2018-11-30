import Dict from './Dict';
import List from './List';
import { iterate } from '../tool/obj';
import { isObj, isArray } from '../tool/is';
import Collection, { ICollection, Key } from './Collection';

export type Primitive = string | number | boolean | undefined | null;

// TODO
// 目前仅支持普通对象和数组
function fromFn(obj: Primitive): Primitive;
function fromFn(obj: object): ICollection;
function fromFn(obj: object | Primitive): Primitive | ICollection {
  if (isObj(obj)) {
    const collection = isArray(obj) ? new List() : new Dict();
    iterate(obj, (v, k) => {
      collection.dataSource.set(k as string | number, fromFn(v));
    });
    return collection;
  } else {
    // 非对象则直接返回
    return obj;
  }
}

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
export function updateIn<NoValue>(
  collection: ICollection,
  path: Key[] | Key,
  value: any,
  noValue?: NoValue
): ICollection {
  path = ([] as Key[]).concat(path);
  if (path.length === 1) {
    return collection.set(path[0], value, noValue);
  } else {
    const currentPath = path[0];
    const next = collection.get(currentPath);
    if (next instanceof Collection) {
      return collection.set(
        currentPath,
        updateIn(next, path.slice(1), value, noValue)
      );
    } else {
      throw new Error(`can not update on: ${next}`);
    }
  }
}

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
export function getIn<NoValue>(
  collection: ICollection,
  path: Key[] | Key,
  noValue?: NoValue
): NoValue | any {
  path = ([] as Key[]).concat(path);
  if (path.length === 1) {
    return collection.get(path[0], noValue);
  } else {
    const currentPath = path[0];
    const next = collection.get(currentPath);
    if (next instanceof Collection) {
      return getIn(next, path.slice(1), noValue);
    } else {
      throw new Error(`can not get on: ${next}`);
    }
  }
}

export const from = fromFn;
