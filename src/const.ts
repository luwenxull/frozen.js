// 原始值
export type PRIMITIVE = string | number | boolean | undefined | null;

// 任意对象或数组
export interface Arbitrary_Object {
  [prop: string]: any;
}
