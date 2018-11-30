import { from } from '../frozen'
import List from '../List';

function baseEatsTest(eats: List) {
  expect(eats.get(0)).toBe('apple')
  expect(eats.get(1)).toBe('juice')
  expect(eats.get(2)).toBeUndefined()
  expect(eats.get(2, 'rice')).toBe('rice')
}

test('get', () => {
  const c = from({ name: 'wenxu', eats: ['apple', 'juice'] })
  expect(c.get('name')).toBe('wenxu')
  expect(c.get('n')).toBeUndefined()
  expect(c.get('n', 1)).toBe(1)
  expect(c.get('eats')).toBeInstanceOf(List)
  const eats = c.get('eats')
  baseEatsTest(eats)
})

test('set', () => {
  const c = from({ name: 'wenxu', eats: ['apple', 'juice'] })
  const nc = c.set('name', 'other')
  expect(c.get('name')).toBe('wenxu')
  expect(nc.get('name')).toBe('other')
  expect(nc.get('eats')).toBeInstanceOf(List)
  const eats = nc.get('eats')
  baseEatsTest(eats)
  const nc2 = c.set('eats', (v: List) => v.set(2, 'rice'))
  expect(nc.get('eats').get(2)).toBeUndefined()
  expect(nc2.get('eats').get(2)).toBe('rice')
  const nc3 = c.set('loc', p => `province ${p}`, 'js')
  expect(nc3.get('loc')).toBe('province js')
})

test('remove', () => {
  const c = from({name: 'wenxu'})
  const nc = c.remove('name')
  expect(nc.get('name')).toBeUndefined()
  expect(c.get('name')).toBe('wenxu')
})
