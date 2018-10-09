import Frozen from './src/Frozen'
const f = new Frozen({
  loc: {
    province: 'jiangsu',
    city: {
      name: 'suzhou',
      code: 215000,
    }
  },
  age: 25
})
const nf = f.set('age', 26)
let nf2 = f.set(['loc', 'province'], 'zhejiang')
nf2 = null
debugger