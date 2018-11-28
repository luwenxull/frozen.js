'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tool_1 = require('./tool');
class Frozen {
  constructor(source, treatAsLeaf = false) {
    this.dataSource = null; //
    this.aberrancePath = null; // 变异路径，一个frozen对象最多有一条变异路径
    this.derivedFrom = null; // 衍生父对象
    this.isArray = false;
    this.isLeaf = false; // 是否是叶节点。叶节点不再有嵌套的Frozen对象
    if (treatAsLeaf || !tool_1.isObj(source)) {
      this.isLeaf = true;
      this.leafData = source;
    } else {
      const map = new Map();
      tool_1.iterate(source, (value, key) => {
        // 不再递归转换Frozen对象
        map.set(key, value instanceof Frozen ? value : new Frozen(value));
      });
      this.dataSource = map;
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
  toObj() {
    if (this.derivedFrom !== null) {
      const obj = this.derivedFrom.toObj();
      const aberrancePath = this.aberrancePath;
      return tool_1.set(obj, aberrancePath.path, aberrancePath.value.toObj());
    } else {
      if (this.isLeaf) {
        return this.leafData;
      } else {
        const obj = this.isArray ? [] : {};
        for (let pair of this.dataSource.entries()) {
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
  set(path, value) {
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
  get(path) {
    return tool_1.get(this.toObj(), path);
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
  static spawn(derivedFrom) {
    const frozen = new Frozen(null);
    frozen.derivedFrom = derivedFrom;
    return frozen;
  }
}
exports.default = Frozen;
