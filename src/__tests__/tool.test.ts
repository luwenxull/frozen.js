import { isObj, iterate, safeGet, updateByPath, toPathUnitFull } from '../tool';

test('isObj', () => {
  expect(isObj(1)).toBeFalsy()
  expect(isObj(null)).toBeFalsy()
  expect(isObj({})).toBeTruthy()
})

test('safeget', () => {
  expect(safeGet({name: 'wenxu'},'name')).toBe('wenxu');
  expect(safeGet.bind(null, 1, 'name')).toThrow('无法从1中读取属性：name');
});

test('toPathUnit', () => {
  expect(toPathUnitFull('loc')).toEqual([{name: 'loc'}])
})

test('updateByPath', () => {
  expect(updateByPath({}, ['name'], 'test')).toEqual({name: 'test'})
  expect(() => updateByPath({}, ['name', 'age'], 'test')).toThrow('{}缺失字段：name')
  expect(() => updateByPath({
    name: 1
  }, ['name', 'age'], 'test')).toThrow('1非对象类型，无法更新字段：name')
  expect(updateByPath({loc: {province: 'js'}}, ['loc','province'],'sh')).toEqual({
    loc: {province: 'sh'}
  })
  expect(updateByPath([{name: 'test'}], [0, 'name'], 't2')).toEqual([{name: 't2'}])
})
