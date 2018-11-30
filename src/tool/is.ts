export function isNull(v: any): v is null {
  return v === null;
}

/**
 * 排除null
 *
 * @export
 * @param {*} v
 * @returns {v is object}
 */
export function isObj(v: any): v is object {
  return typeof v === 'object' && !isNull(v);
}

export function isFn(v: any): v is Function {
  return typeof v === 'function';
}

export function isArray(v: any): v is Array<any> {
  return v instanceof Array;
}

export function isUndef(v: any): v is undefined {
  return typeof v === 'undefined';
}
