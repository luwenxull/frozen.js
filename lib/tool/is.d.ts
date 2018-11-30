export declare function isNull(v: any): v is null;
/**
 * 排除null
 *
 * @export
 * @param {*} v
 * @returns {v is object}
 */
export declare function isObj(v: any): v is object;
export declare function isFn(v: any): v is Function;
export declare function isArray(v: any): v is Array<any>;
export declare function isUndef(v: any): v is undefined;
export declare function isMap(v: any): v is Map<any, any>;
