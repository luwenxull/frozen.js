import { safeGet, isObj } from "./tool";

type Primitive = string | number | boolean
type FrozenMapValue = Frozen | Primitive
type FrozenMap = Map<string, FrozenMapValue>

export default class Frozen {
  private sourceMap: FrozenMap
  private remoteFrozen: Frozen = null
  private _isArray: boolean = false
  constructor(source: object) {
    this.sourceMap = Object.keys(source).reduce((map: Map<string, FrozenMapValue>, key: string) => {
      return map.set(key, Frozen.deepTransform(source[key]))
    }, new Map())
    if (source instanceof Array) {
      this._isArray = true
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
  public get(path: string | string[], defalutValue?: any): any {
    let current = this, result = null
    const paths = [].concat(path), l = paths.length
    try {
      for (let i = 0; i < l; i++) {
        const field = paths[i]
        if (current instanceof Frozen) {
          result = current._get(field, paths)
        } else {
          result = safeGet(current, field)
        }
        current = result
      }
    } catch (err) {
      if (defalutValue !== undefined) {
        return defalutValue
      } else {
        throw err
      }
    }
    return result
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
  public set(path: string | string[], value: any): Frozen {
    const paths = [].concat(path), l = paths.length
    const newFrozen = new Frozen({})
    let remote: Frozen = this
    let current = newFrozen.link(this)
    for (let i = 0; i < l; i++) {
      const field = paths[i]
      if (i === l - 1) {
        current._set(field, value)
      } else {
        remote = remote.get(field)
        const nf = new Frozen({}).link(remote)
        current._set(field, nf)
        current = nf
      }
    }
    return newFrozen
  }

  /**
   * 转成普通obj对象
   *
   * @returns {object}
   * @memberof Frozen
   */
  public toObj(): object {
    return this._toObj()
  }

  /**
   * 连接两个frozen对象
   *
   * @private
   * @param {Frozen} remote
   * @returns {this}
   * @memberof Frozen
   */
  private link(remote: Frozen): this {
    this.remoteFrozen = remote
    return this
  }

  /**
   * 内部get方法
   *
   * @private
   * @param {string} key
   * @returns {*}
   * @memberof FrozenMap
   */
  private _get(key: string, fullPath: string[]): any {
    if (this.sourceMap.has(key)) {
      return this.sourceMap.get(key)
    } else if (this.remoteFrozen) {
      return this.remoteFrozen.get(key)
    } else {
      throw new Error(`路径：${fullPath.join('.')}无数据`)
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
  private _set(key: string, value): this {
    this.sourceMap.set(key, Frozen.deepTransform(value))
    return this
  }
  
  /**
   * 内部的toobj实现
   *
   * @private
   * @param {Set<string>} [excludeKeys=new Set()]
   * @returns
   * @memberof Frozen
   */
  private _toObj(excludeKeys: Set<string> = new Set()): object {
    const obj = this._isArray ? [] : {}
    if (this.remoteFrozen) {
      Object.assign(obj, this.remoteFrozen._toObj(new Set(this.sourceMap.keys())))
    }
    for (let [key, value] of this.sourceMap.entries()) {
      if (!excludeKeys.has(key)) {
        if (value instanceof Frozen) {
          obj[key] = value._toObj()
        } else {
          obj[key] = value
        }
      }
    }
    return obj
  }

  static deepTransform(source: any): FrozenMapValue {
    if (isObj(source) && !(source instanceof Frozen)) {
      return new Frozen(source)
    } else {
      return source
    }
  }
}