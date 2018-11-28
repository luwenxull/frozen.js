import { isObj, iterate, updateByPath } from './tool';
import { PRIMITIVE, Arbitrary_Object } from './const';

// frozen对象的数据源, 可以是Map，可以是primitive，取决于是否是叶节点
export type DataSource = Map<string | number, Frozen>;
// 完整格式的path描述
export type PathUnit_Full = {
  name: string | number;
  dft?: any;
};
/**
 * 简易的path描述
 * 注意：simple包含full
 */
export type PathUnit_Simple = PathUnit_Full | string | number;
export type AberrancePath = {
  path: PathUnit_Simple | PathUnit_Simple[];
  value: Frozen;
};

export default class Frozen {
  private dataSource: DataSource | PRIMITIVE; // 由构造函数初始化
  private aberrancePath: AberrancePath | null = null; // 变异路径，一个frozen对象最多有一条变异路径
  private derivedFrom: Frozen | null = null; // 衍生父对象
  private isArray: boolean = false;
  private isLeaf: boolean = false; // 是否是叶节点。叶节点不再有嵌套的Frozen对象
  constructor(source: Arbitrary_Object | PRIMITIVE) {
    if (isObj(source)) {
      this.dataSource = new Map();
      iterate(source, (value, key) => {
        (this.dataSource as DataSource).set(key, new Frozen(value));
      });
    } else {
      // 叶节点
      this.isLeaf = true;
      this.dataSource = source;
    }
    if (source instanceof Array) {
      this.isArray = true;
    }
  }

  /**
   * 转成object类型
   *
   * @returns {*}
   * @memberof Frozen
   */
  public toObj(): any {
    if (this.derivedFrom !== null) {
      const obj = this.derivedFrom.toObj();
      const aberrancePath = this.aberrancePath as AberrancePath;
      return updateByPath(obj, aberrancePath.path, aberrancePath.value.toObj());
    } else {
      if (this.isLeaf) {
        return this.dataSource;
      } else {
        const obj: Arbitrary_Object = this.isArray ? [] : {};
        for (let pair of (this.dataSource as DataSource).entries()) {
          const [key, value] = pair;
          obj[key] = value.toObj();
        }
        return obj;
      }
    }
  }

  /**
   * 按路径更新，返回一个新的Frozen对象
   * 这个对象不会修改任何值，只会记录一条独有路径
   *
   * @param {Path} path
   * @param {*} value
   * @returns {Frozen}
   * @memberof Frozen
   */
  public set(path: PathUnit_Simple | PathUnit_Simple[], value: any): Frozen {
    if (this.isLeaf && !this.derivedFrom) {
      throw new Error(`无法在当前对象上变更路径：${path}`);
    }
    const frozen = Frozen.spawn(this); // 生成全新的Frozen对象
    frozen.aberrancePath = {
      path,
      value: new Frozen(value)
    };
    return frozen;
  }

  public get(path: PathUnit_Simple | PathUnit_Simple[]): any {
    const obj = this.toObj();
  }

  /**
   * 衍生出一个字对象
   * 每个字对象都不是leaf节点，但是datasource没有内容
   *
   * @static
   * @param {Frozen} derivedFrom
   * @returns {Frozen}
   * @memberof Frozen
   */
  static spawn(derivedFrom: Frozen): Frozen {
    const frozen = new Frozen(null);
    frozen.derivedFrom = derivedFrom;
    return frozen;
  }
}
