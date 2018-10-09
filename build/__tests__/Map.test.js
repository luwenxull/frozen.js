"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Frozen_1 = __importDefault(require("../Frozen"));
const source = {
    loc: {
        province: 'jiangsu',
        city: {
            name: 'suzhou',
            code: 215000,
        }
    },
    age: 25
};
test('get', () => {
    const f = new Frozen_1.default(source);
    expect(f['age']).toBeUndefined();
    expect(f.get('age')).toBe(25);
    expect(f.get(['loc', 'province'])).toBe('jiangsu');
    expect(f.get(['loc', 'city', 'code'])).toBe(215000);
    expect(f.get(['ag'], 1)).toBe(1);
    expect(() => {
        f.get(['ag']);
    }).toThrow('路径：ag无数据');
});
test('set', () => {
    const f = new Frozen_1.default(source);
    const nf = f.set('age', 26);
    expect(nf.get('age')).toBe(26);
    expect(nf.get('loc')).toBe(f.get('loc'));
    const nf2 = f.set(['loc', 'province'], 'zhejiang');
    expect(nf2.get(['loc', 'province'])).toBe('zhejiang');
    // expect(nf2.get(['loc','city'])).toBe(f.get(['loc','city']))
});
