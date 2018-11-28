'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tool_1 = require('./tool');
class Frozen {
  constructor(source) {
    this.aberrancePath = null; // 变异路径，一个frozen对象最多有一条变异路径
    this.derivedFrom = null; // 衍生父对象
    this.isArray = false;
    this.isLeaf = false; // 是否是叶节点。叶节点不再有嵌套的Frozen对象
    if (tool_1.isObj(source)) {
      this.dataSource = new Map();
      tool_1.iterate(source, (value, key) => {
        this.dataSource.set(key, new Frozen(value));
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
  toObj() {
    if (this.derivedFrom !== null) {
      const obj = this.derivedFrom.toObj();
      const aberrancePath = this.aberrancePath;
      return tool_1.updateByPath(
        obj,
        aberrancePath.path,
        aberrancePath.value.toObj()
      );
    } else {
      if (this.isLeaf) {
        return this.dataSource;
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
  set(path, value) {
    // if (this.isLeaf) {
    //   throw new Error(`无法在当前Frozen对象上读取路径：${path}`);
    // }
    const frozen = Frozen.spawn(this); // 生成全新的Frozen对象
    frozen.aberrancePath = {
      path: [].concat(path),
      value: new Frozen(value)
    };
    return frozen;
  }
  static spawn(derivedFrom) {
    const frozen = new Frozen(null);
    frozen.derivedFrom = derivedFrom;
    return frozen;
  }
}
exports.default = Frozen;
