import { iterate } from '../obj'

test('iterate', () => {
  const fn = jest.fn()
  iterate([8, 9], fn)
  expect(fn.mock.calls).toEqual([[8, 0], [9, 1]])
  fn.mockClear()
  iterate({ name: 'wenxu' }, fn)
  expect(fn.mock.calls).toEqual([['wenxu', 'name']])
  fn.mockClear()
  const map = new Map()
  map.set(1, 2)
  iterate(map, fn)
  expect(fn.mock.calls).toEqual([[2, 1]])
})