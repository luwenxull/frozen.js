import { safeGet } from "../tool";

test('safeget', () => {
  expect(safeGet({
    name: 'wenxu'
  }, 'name')).toBe('wenxu')
  expect(safeGet.bind(null, 1, 'name')).toThrow('无法从1中读取属性：name')
})
