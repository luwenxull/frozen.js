'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const Dict_1 = __importDefault(require('./Dict'));
const List_1 = __importDefault(require('./List'));
const obj_1 = require('../tool/obj');
const is_1 = require('../tool/is');
function from(obj) {
  if (is_1.isObj(obj)) {
    const collection = is_1.isArray(obj)
      ? new List_1.default()
      : new Dict_1.default();
    obj_1.iterate(obj, (v, k) => {
      collection.dataSource.set(k, from(v));
    });
    return collection;
  } else {
    // 非对象则直接返回
    return obj;
  }
}
exports.default = from;
