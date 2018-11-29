export function isFn(v: any): v is Function {
  return typeof v === 'function';
}

export function isNull(v: any): v is null {
  return v === null;
}
