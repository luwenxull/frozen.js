import { PathUnit_Simple, PathUnit_Full } from '../Frozen';
/**
 * 统一包装成object类型的pathunit
 *
 * @export
 * @param {(PathUnit_Simple | PathUnit_Simple[])} path
 * @returns {PathUnit_Full[]}
 */
export declare function toPathUnitFull(
  path: PathUnit_Simple | PathUnit_Simple[]
): PathUnit_Full[];
