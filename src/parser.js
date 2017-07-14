
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
  ws = () => parser((str, offset) => {
    let res = this.whiteSpace.exec(str.substr(offset));
    return res && this.apply(str, offset + res[0].length);
  });
  opt = () => parser((str, offset) => (
    this.apply(str, offset) || { res: undefined, pos: offset }
  ));
}

export const parser = (apply) => new Parser(apply);

export default parser;