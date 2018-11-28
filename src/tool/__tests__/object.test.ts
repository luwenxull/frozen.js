import { isObj, get, set } from "../object";

test('isObj', () => {
  expect(isObj(1)).toBeFalsy()
  expect(isObj(null)).toBeFalsy()
  expect(isObj({})).toBeTruthy()
})

test('get', () => {
  expect(get({ name: 'wx' }, 'name')).toBe('wx')
  expect(get({}, 'name')).toBe(undefined)
  expect(get({}, ['name', 'first'])).toBe(undefined)
  expect(get({}, ['name', 'first'], 'wx')).toBe('wx')
  expect(get([], [0, 1], 't')).toBe('t')
})

test('set', () => {
  expect(set({}, ['name'], 'test')).toEqual({ name: 'test' })
  expect(() => set({}, ['name', 'age'], 'test')).toThrow('{}缺失字段：name')
  expect(() => set({
    name: 1
  }, ['name', 'age'], 'test')).toThrow('1非对象类型，无法更新字段：name')
  expect(set({ loc: { province: 'js' } }, ['loc', 'province'], 'sh')).toEqual({
    loc: { province: 'sh' }
  })
  expect(set([{ name: 'test' }], [0, 'name'], 't2')).toEqual([{ name: 't2' }])
  expect(set({}, [{ name: 'loc', dft: {} }, 'city'], 'nt')).toEqual({ loc: { city: 'nt' } })
})
