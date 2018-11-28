import { safeGet, isObj, iterate, updateByPath } from './tool';
import { PRIMITIVE, Arbitrary_Object } from './const';

// frozen对象的数据源, 可以是Map，可以是primitive，取决于是否是叶节点
export type DataSource = Map<string | number, Frozen>;
export type AberrancePath = {
  path: Array<string | number>;
  value: Frozen;
};
export type Path = number | string | Array<number | string>;

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

  public set(path: Path, value: any): Frozen {
    // if (this.isLeaf) {
    //   throw new Error(`无法在当前Frozen对象上读取路径：${path}`);
    // }
    const frozen = Frozen.spawn(this); // 生成全新的Frozen对象
    frozen.aberrancePath = {
      path: ([] as Array<string | number>).concat(path),
      value: new Frozen(value)
    };
    return frozen;
  }

  static spawn(derivedFrom: Frozen): Frozen {
    const frozen = new Frozen(null);
    frozen.derivedFrom = derivedFrom;
    return frozen;
  }
}
