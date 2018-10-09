"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 判断对象是否是object
 * 排除null
 *
 * @export
 * @param {*} obj
 * @returns {boolean}
 */
function isObj(obj) {
    return typeof obj === 'object' && obj !== null;
}
exports.isObj = isObj;
/**
 * 安全get函数
 *
 * @export
 * @param {*} source
 * @param {string} key
 * @returns {*}
 */
function safeGet(source, key) {
    if (isObj(source)) {
        return source[key];
    }
    else {
        throw new Error(`无法从${source}中读取属性：${key}`);
    }
}
exports.safeGet = safeGet;
