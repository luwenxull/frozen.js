"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tool_1 = require("./tool");
class Frozen {
    constructor(source) {
        this.remoteFrozen = null;
        this.sourceMap = Object.keys(source).reduce((map, key) => {
            return map.set(key, Frozen.deepTransform(source[key]));
        }, new Map());
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
                    result = current.innerGet(field, paths);
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
    set(path, value) {
        const paths = [].concat(path), l = paths.length;
        const newFrozen = new Frozen({});
        let remote = this;
        let current = newFrozen.link(this);
        for (let i = 0; i < l; i++) {
            const field = paths[i];
            if (i === l - 1) {
                current.directSet(field, value);
            }
            else {
                remote = remote.get(field);
                const nf = new Frozen({}).link(remote);
                current.directSet(field, nf);
                current = nf;
            }
        }
        return newFrozen;
    }
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
    innerGet(key, fullPath) {
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
    directSet(key, value) {
        this.sourceMap.set(key, Frozen.deepTransform(value));
        return this;
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
