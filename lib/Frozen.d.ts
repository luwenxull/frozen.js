import { PRIMITIVE, Arbitrary_Object } from './const';
export declare type DataSource = Map<string | number, Frozen>;
export declare type PathUnit_Full = {
  name: string | number;
  dft?: any;
};
/**
 * 简易的path描述
 * 注意：simple包含full
 */
export declare type PathUnit_Simple = PathUnit_Full | string | number;
export declare type AberrancePath = {
  path: PathUnit_Simple | PathUnit_Simple[];
  value: Frozen;
};
export default class Frozen {
  private dataSource;
  private aberrancePath;
  private derivedFrom;
  private isArray;
  private isLeaf;
  private leafData;
  constructor(source: Arbitrary_Object | PRIMITIVE, treatAsLeaf?: boolean);
  /**
   * 转成object类型
   *
   * @returns {*}
   * @memberof Frozen
   */
  toObj(): any;
  /**
   * 按路径更新，返回一个新的Frozen对象
   * 这个对象不会修改任何值，只会记录一条独有路径
   *
   * @param {Path} path
   * @param {*} value
   * @returns {Frozen}
   * @memberof Frozen
   */
  set(path: PathUnit_Simple | PathUnit_Simple[], value: any): Frozen;
  get(path: PathUnit_Simple | PathUnit_Simple[]): any;
  /**
   * 衍生出一个字对象
   * 每个字对象都不是leaf节点，但是datasource没有内容
   *
   * @static
   * @param {Frozen} derivedFrom
   * @returns {Frozen}
   * @memberof Frozen
   */
  static spawn(derivedFrom: Frozen): Frozen;
}
