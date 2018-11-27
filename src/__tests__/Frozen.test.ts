import Frozen from '..'

test('constructor', () => {
  const f = new Frozen(1)
  expect(f['isLeaf']).toBe(true)
  expect(f['dataSource']).toBe(1)
  expect(f['isArray']).toBeFalsy()
  const f2 = new Frozen({
    name: 'test'
  })
  expect(f2['isLeaf']).toBeFalsy()
  expect(f2['isArray']).toBeFalsy()
  const ds = f2['dataSource'] as Map<string, Frozen>
  const f3 = ds.get('name') as Frozen
  expect(f3).toBeInstanceOf(Frozen)
  expect(f3['isLeaf']).toBeTruthy()
  expect(f3['dataSource']).toBe('test')
})