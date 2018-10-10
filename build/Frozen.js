"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tool_1 = require("./tool");
class Frozen {
    constructor(source) {
        this.remoteFrozen = null;
        this._isArray = false;
        this.sourceMap = Object.keys(source).reduce((map, key) => {
            return map.set(key, Frozen.deepTransform(source[key]));
        }, new Map());
        if (source instanceof Array) {
            this._isArray = true;
        }
    }
    /**
     * 按路径读取
     *
     * @param {(string | string[])} path
     * @param {*} [defalutValue]
     * @returns {*}
     * @memberof FrozenMap
     */
    get(path, defalutValue) {
        let current = this, result = null;
        const paths = [].concat(path), l = paths.length;
        try {
            for (let i = 0; i < l; i++) {
                const field = paths[i];
                if (current instanceof Frozen) {
                    result = current._get(field, paths);
                }
                else {
                    result = tool_1.safeGet(current, field);
                }
                current = result;
            }
        }
        catch (err) {
            if (defalutValue !== undefined) {
                return defalutValue;
            }
            else {
                throw err;
            }
        }
        return result;
    }
    /**
     * 按路径赋值
     * 不会改变当前对象，而是始终返回一个新的Frozen对象
     *
     * @param {(string | string[])} path
     * @param {*} value
     * @returns {Frozen}
     * @memberof Frozen
     */
    set(path, value) {
        const paths = [].concat(path), l = paths.length;
        const newFrozen = new Frozen({});
        let remote = this;
        let current = newFrozen.link(this);
        for (let i = 0; i < l; i++) {
            const field = paths[i];
            if (i === l - 1) {
                current._set(field, value);
            }
            else {
                remote = remote.get(field);
                const nf = new Frozen({}).link(remote);
                current._set(field, nf);
                current = nf;
            }
        }
        return newFrozen;
    }
    /**
     * 转成普通obj对象
     *
     * @returns {object}
     * @memberof Frozen
     */
    toObj() {
        return this._toObj();
    }
    /**
     * 连接两个frozen对象
     *
     * @private
     * @param {Frozen} remote
     * @returns {this}
     * @memberof Frozen
     */
    link(remote) {
        this.remoteFrozen = remote;
        return this;
    }
    /**
     * 内部get方法
     *
     * @private
     * @param {string} key
     * @returns {*}
     * @memberof FrozenMap
     */
    _get(key, fullPath) {
        if (this.sourceMap.has(key)) {
            return this.sourceMap.get(key);
        }
        else if (this.remoteFrozen) {
            return this.remoteFrozen.get(key);
        }
        else {
            throw new Error(`路径：${fullPath.join('.')}无数据`);
        }
    }
    /**
     * 直接修改内部的map
     *
     * @private
     * @param {string} key
     * @param {*} value
     * @returns {this}
     * @memberof Frozen
     */
    _set(key, value) {
        this.sourceMap.set(key, Frozen.deepTransform(value));
        return this;
    }
    /**
     * 内部的toobj实现
     *
     * @private
     * @param {Set<string>} [excludeKeys=new Set()]
     * @returns
     * @memberof Frozen
     */
    _toObj(excludeKeys = new Set()) {
        const obj = this._isArray ? [] : {};
        if (this.remoteFrozen) {
            Object.assign(obj, this.remoteFrozen._toObj(new Set(this.sourceMap.keys())));
        }
        for (let [key, value] of this.sourceMap.entries()) {
            if (!excludeKeys.has(key)) {
                if (value instanceof Frozen) {
                    obj[key] = value._toObj();
                }
                else {
                    obj[key] = value;
                }
            }
        }
        return obj;
    }
    static deepTransform(source) {
        if (tool_1.isObj(source) && !(source instanceof Frozen)) {
            return new Frozen(source);
        }
        else {
            return source;
        }
    }
}
exports.default = Frozen;
