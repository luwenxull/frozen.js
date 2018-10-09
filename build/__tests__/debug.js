"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Frozen_1 = __importDefault(require("../Frozen"));
const f = new Frozen_1.default({
    loc: {
        province: 'jiangsu',
        city: {
            name: 'suzhou',
            code: 215000,
        }
    },
    age: 25
});
const nf = f.set('age', 26);
const nf2 = f.set(['loc', 'province'], 'zhejiang');
console.log(nf2);
