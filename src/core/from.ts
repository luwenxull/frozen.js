import Dict from './Dict';
import List from './List';
import { iterate } from '../tool/obj';
import { isObj, isArray } from '../tool/is';
import { ICollection } from './Collection';

export type Primitive = string | number | boolean | undefined | null;

// TODO
// 目前仅支持普通对象和数组
function from(obj: Primitive): Primitive;
function from(obj: object): ICollection;
function from(obj: object | Primitive): Primitive | ICollection {
  if (isObj(obj)) {
    const collection = isArray(obj) ? new List() : new Dict();
    iterate(obj, (v, k) => {
      collection.dataSource.set(k as string | number, from(v));
    });
    return collection;
  } else {
    // 非对象则直接返回
    return obj;
  }
}

export default from;
