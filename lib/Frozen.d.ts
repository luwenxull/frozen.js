import { PRIMITIVE, Arbitrary_Object } from './const';
export declare type DataSource = Map<string | number, Frozen>;
export declare type AberrancePath = {
  path: Array<string | number>;
  value: Frozen;
};
export declare type Path = number | string | Array<number | string>;
export default class Frozen {
  private dataSource;
  private aberrancePath;
  private derivedFrom;
  private isArray;
  private isLeaf;
  constructor(source: Arbitrary_Object | PRIMITIVE);
  toObj(): any;
  set(path: Path, value: any): Frozen;
  static spawn(derivedFrom: Frozen): Frozen;
}
