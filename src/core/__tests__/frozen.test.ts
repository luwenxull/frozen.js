import { from, updateIn, getIn } from '../frozen'
import List from '../List';

test('from', () => {
  expect(from(1)).toBe(1)
  const c = from({ name: 'wenxu' })
  expect(c.dataSource).not.toBeUndefined()
  expect(c.dataSource.get('name')).toBe('wenxu')
  const c2 = from({ name: 'wenxu', eats: ['apple', 'juice'] })
  expect(c2.dataSource.get('name')).toBe('wenxu')
  expect(c2.dataSource.get('eats')).toBeInstanceOf(List)
  expect(c2.dataSource.get('eats').dataSource.get(0)).toBe('apple')
  expect(c2.dataSource.get('eats').dataSource.get(1)).toBe('juice')
})

test('updateIn', () => {
  const c = from({ name: 'wenxu' })
  const nc = updateIn(c, ['name'], 'other')
  expect(c.get('name')).toBe('wenxu')
  expect(nc.get('name')).toBe('other')
  const c2 = from({ loc: { city: 'nt' } })
  const nc2 = updateIn(c2, ['loc', 'city'], 'sz')
  expect(c2.get('loc').get('city')).toBe('nt')
  expect(nc2.get('loc').get('city')).toBe('sz')
  const nc3 = updateIn(c2, ['loc', 'province'], 'js')
  expect(nc3.get('loc').get('city')).toBe('nt')
  expect(nc3.get('loc').get('province')).toBe('js')
  const nc4 = updateIn(c2, ['loc', 'province'], () => 'js')
  expect(nc4.get('loc').get('province')).toBe('js')
  const nc5 = updateIn(c2, ['loc', 'province'], (v: any) => v, 'js')
  expect(nc5.get('loc').get('province')).toBe('js')
})

test('getIn', () => {
  const c = from({ loc: { city: 'nt' } })
  expect(getIn(c, ['loc', 'city'])).toBe('nt')
})
