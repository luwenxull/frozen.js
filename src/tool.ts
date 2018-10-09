/**
 * 判断对象是否是object
 * 排除null
 *
 * @export
 * @param {*} obj
 * @returns {boolean}
 */
export function isObj(obj: any): boolean {
  return typeof obj === 'object' && obj !== null
}


/**
 * 安全get函数
 *
 * @export
 * @param {*} source
 * @param {string} key
 * @returns {*}
 */
export function safeGet(source, key: string): any {
  if (isObj(source)) {
    return source[key]
  } else {
    throw new Error(`无法从${source}中读取属性：${key}`)
  }
}