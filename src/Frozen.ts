import { safeGet, isObj, iterateObj } from './tool';
import { VALUE_PRIMITIVE, VALUE_OBJECT_ATRITRARY } from './const';

// frozen对象的数据源, 可以是Map，可以是primitive，取决于是否是叶节点
type DataSource = Map<string, Frozen> | VALUE_PRIMITIVE;
type PathTracer = Map<string, any>

export default class Frozen {
  private dataSource: DataSource; // 由构造函数初始化
  private pathTracer: PathTracer = new Map() // 追踪通过set方法添加的路径
  private derivedFrom: Frozen | null = null;
  private isArray: boolean = false;
  private isLeaf: boolean = false; // 是否是叶节点。叶节点不再有嵌套的Frozen对象
  private isFromSpawn: boolean = false;
  constructor(source: VALUE_OBJECT_ATRITRARY | VALUE_PRIMITIVE) {
    if (isObj(source)) {
      this.dataSource = new Map();
      iterateObj(source, (value, key) => {
        (this.dataSource as Map<string, Frozen>).set(
          key as string,
          new Frozen(value)
        );
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

  public get(path: string | string[]): any {
    const fullPath = ([] as string[]).concat(path)
    fullPath.forEach((path, i) => {
      if (this.pathTracer.has(path)) {
        const tracer = this.pathTracer.get(path)
      }
    })
  }

  public set(path: string | string[], value: any): Frozen {
    const frozen = Frozen.spawn(this) // 生成全新的Frozen对象
    const fullPath = ([] as string[]).concat(path) // 完整路径数组
    fullPath.forEach((path, i) => {
      if (!this.pathTracer.has(path) /* 初始化当前路径 */) {
        this.pathTracer.set(path, new Map())
      }
      if (i === fullPath.length - 1) {
        this.pathTracer.set(path, new Frozen(value))
      }
    })
    return frozen
  }

  static spawn(derivedFrom: Frozen): Frozen {
    const frozen = new Frozen(null)
    frozen.derivedFrom = derivedFrom
    frozen.isFromSpawn = true
    return frozen
  }
}
