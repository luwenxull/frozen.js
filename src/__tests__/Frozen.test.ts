import Frozen, { DataSource } from '../Frozen'

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
  const ds = f2['dataSource'] as DataSource
  const f3 = ds.get('name') as Frozen
  expect(f3).toBeInstanceOf(Frozen)
  expect(f3['isLeaf']).toBeTruthy()
  expect(f3['dataSource']).toBe('test')
  const f4 = new Frozen([1])
  expect(f4['isArray']).toBeTruthy()
})

test('toObj', () => {
  expect(new Frozen(1).toObj()).toBe(1)
  expect(new Frozen([1,2]).toObj()).toEqual([1,2])
  expect(new Frozen({
    name: 'test'
  }).toObj()).toEqual({
    name: 'test'
  })
  expect(new Frozen({
    loc: {
      name: 'js'
    }
  }).toObj()).toEqual({
    loc: {
      name: 'js'
    }
  })
  const f = new Frozen({
    name: 't'
  })
  expect(f.set('name', 't2').toObj()).toEqual({name: 't2'})
  expect(f.set('name', 't3').set('age', 20).toObj()).toEqual({name: 't3', age: 20})
  expect(f.toObj()).toEqual({name: 't'})
})
