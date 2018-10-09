import Frozen from '../Frozen'
const source = {
  loc: {
    province: 'jiangsu',
    city: {
      name: 'suzhou',
      code: 215000,
    }
  },
  age: 25
}

test('get', () => {
  const f = new Frozen(source)
  expect(f['age']).toBeUndefined()
  expect(f.get('age')).toBe(25)
  expect(f.get(['loc','province'])).toBe('jiangsu')
  expect(f.get(['loc','city','code'])).toBe(215000)
  expect(f.get(['ag'], 1)).toBe(1)
  expect(() => {
    f.get(['ag'])
  }).toThrow('路径：ag无数据')
})

test('set', () => {
  const f = new Frozen(source)
  const nf = f.set('age', 26)
  expect(nf.get('age')).toBe(26)
  expect(nf.get('loc')).toBe(f.get('loc'))
  const nf2 = f.set(['loc','province'], 'zhejiang')
  expect(nf2.get(['loc','province'])).toBe('zhejiang')
  expect(nf2.get(['loc','city'])).toBe(f.get(['loc','city']))
  const nf3 = nf2.set(['loc','city','name'], 'nantong')
  expect(nf3.get(['loc','city','name'])).toBe('nantong')
  expect(nf3.get(['loc','city','code'])).toBe(215000)
})

test('toobj', () => {
  const f = new Frozen(source)
  const nf = f.set('age', 26)
  expect(f.toObj()).toEqual(source)
})