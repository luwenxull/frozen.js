import { ICollection } from './Collection';
export declare type Primitive = string | number | boolean | undefined | null;
declare function from(obj: Primitive): Primitive;
declare function from(obj: object): ICollection;
export default from;
