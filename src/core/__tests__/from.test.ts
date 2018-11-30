import from from '../from'
import List from '../List';

test('from', () => {
  expect(from(1)).toBe(1)
  const c = from({name:'wenxu'})
  expect(c.dataSource).not.toBeUndefined()
  expect(c.dataSource.get('name')).toBe('wenxu')
  const c2 = from({name:'wenxu', eats: ['apple','juice']})
  expect(c2.dataSource.get('name')).toBe('wenxu')
  expect(c2.dataSource.get('eats')).toBeInstanceOf(List)
  expect(c2.dataSource.get('eats').dataSource.get(0)).toBe('apple')
  expect(c2.dataSource.get('eats').dataSource.get(1)).toBe('juice')
})
