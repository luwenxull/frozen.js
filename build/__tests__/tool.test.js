"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tool_1 = require("../tool");
test('safeget', () => {
    expect(tool_1.safeGet({
        name: 'wenxu'
    }, 'name')).toBe('wenxu');
    expect(tool_1.safeGet.bind(null, 1, 'name')).toThrow('无法从1中读取属性：name');
});
