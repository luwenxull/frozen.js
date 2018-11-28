import { PathUnit_Simple, PathUnit_Full } from '../Frozen';
import { isObj } from './object';

/**
 * 统一包装成object类型的pathunit
 *
 * @export
 * @param {(PathUnit_Simple | PathUnit_Simple[])} path
 * @returns {PathUnit_Full[]}
 */
export function toPathUnitFull(
  path: PathUnit_Simple | PathUnit_Simple[]
): PathUnit_Full[] {
  const pathArr = ([] as PathUnit_Simple[]).concat(path);
  return pathArr.map(path => {
    if (isObj(path)) {
      return path;
    } else {
      return {
        name: path
      };
    }
  });
}
