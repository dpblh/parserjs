
const flatten = list => list.reduce(
  (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
);

export class Parser {
  whiteSpace = /\s*/;
  constructor (apply) {
    this._apply = apply;
  }
  apply = (str, offset = 0) => this._apply(str, offset) || false;
  then = (transform) => parser((str, offset) => {
    let res = this.apply(str, offset);
    return res && { res: transform(res.res), pos: res.pos };
  });
  and = (p) => parser((str, offset) => {
    let resl = this.apply(str, offset), resr;
    return resl && (resr = p.apply(str, resl.pos)) && { res: flatten([resl.res, resr.res]), pos: resr.pos };
  });
  andl = (p) => parser((str, offset) => {
    let resl = this.apply(str, offset), resr;
    return resl && (resr = p.apply(str, resl.pos)) && { res: resl.res, pos: resr.pos };
  });
  andr = (p) => parser((str, offset) => {
    let resl = this.apply(str, offset), resr;
    return resl && (resr = p.apply(str, resl.pos)) && { res: resr.res, pos: resr.pos };
  });
  ws = () => parser((str, offset) => {
    let res = this.whiteSpace.exec(str.substr(offset));
    return res && this.apply(str, offset + res[0].length);
  });
  opt = () => parser((str, offset) => (
    this.apply(str, offset) || { res: undefined, pos: offset }
  ));
  not = (p) => parser((str, offset) => {
    let res = this.apply(str, offset);
    return res && !p.apply(str, offset) && res;
  });
  rep = () => parser((str, offset) => {
    let result = [], res;
    while (res = this.apply(str, offset)) {
      result.push(res.res);
      offset = res.pos;
    }
    return { res: result, pos: offset };
  })
}

export const parser = (apply) => new Parser(apply);

export default parser;