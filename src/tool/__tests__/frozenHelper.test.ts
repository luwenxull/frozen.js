import { toPathUnitFull } from "../frozenHelper";
test('toPathUnit', () => {
  expect(toPathUnitFull('loc')).toEqual([{ name: 'loc' }])
})
