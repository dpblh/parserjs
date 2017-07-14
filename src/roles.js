import { parser } from './parser'

export const txt = (str2) => parser((str, offset) => (
  str.substr(offset, str2.length) == str2 && { res: str2, pos: offset + str2.length }
));

export const reg = (regexp) => parser((str, offset) => {
  let res = regexp.exec(str.substr(offset));
  return res && res.index === 0 && { res: res[ 0 ], pos: offset + res[ 0 ].length };
});

export const opt = (pars) => parser((str, offset) => (
  pars.apply(str, offset) || { res: undefined, pos: offset }
));

export const rep = (pars) => parser((str, offset) => {
  let result = [], res;
  while (res = pars.apply(str, offset)) {
    result.push(res.res);
    offset = res.pos;
  }
  return { res: result, pos: offset };
});

export const or = (...args) => parser((str, offset) => {
  for (let value of args) {
    let res = value.apply(str, offset);
    if (res) return res;
  }
});

export const and = (...args) => parser((str, offset) => {
  let result = [];

  for (let value of args) {
    let res = value.apply(str, offset);
    if (!res) return;
    offset = res.pos;
    result.push(res.res);
  }

  return { res: result, pos: offset };
});

