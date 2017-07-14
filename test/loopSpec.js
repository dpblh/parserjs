import { expect } from 'chai';
import {
  txt,
  reg,
  and,
  or,
  rep
} from '../src/roles';
import {
  parser
} from '../src/parser'

describe('roles', () => {

  const For = txt('for');
  const val = reg(/[A-Z-a-z]+/);
  const of = txt('of');

  const number = reg(/\d+/);
  const term = or(val, number);
  const operator = or(txt('+'), txt('-'));

  const expr = and(term.ws(), rep(and(operator.ws(), term.ws())).ws()).then(([term, expr]) => ({
    class: 'expr',
    expr : [ term ].concat(expr)
  }));

  const statement = or(parser((str, offset) => loop.apply(str, offset)), expr);

  const block = and(txt('{'), rep(statement).ws(), txt('}').ws()).then(([ql, states, qr]) => ({
    class: 'block',
    states
  }));

  const statements = or(block, statement);

  const loop = and(For, val.ws(), of.ws(), val.ws(), statements.ws()).then(([def, item, of, iterator, statements ]) => ({
    class: 'loop',
    item,
    iterator,
    statements
  }));

  describe('txt', () => {

    it('should return loop', () => {
      expect(loop.apply('for i of iterator i + 1')).to.be.deep.equal({
        "pos": 23,
        "res": {
          "class"     : "loop",
          "item"      : "i",
          "iterator"  : "iterator",
          "statements": {
            "class": "expr",
            "expr" : [ "i", [ "+", "1", ] ]
          }
        }
      });

      expect(loop.apply('for i of iterator { i + 1 }')).to.be.deep.equal({
        "pos": 27,
        "res": {
          "class"     : "loop",
          "item"      : "i",
          "iterator"  : "iterator",
          "statements": {
            "class" : "block",
            "states": [
              {
                "class": "expr",
                "expr" : [ "i", [ "+", "1", ] ]
              }
            ]
          }
        }
      });
    });

    console.log(JSON.stringify(loop.apply('for i of iterator { for j of i j + 1 }')))

    expect(loop.apply('for i of iterator { for j of i j + 1 }')).to.be.deep.equal({
      "pos": 38,
      "res": {
        "class"     : "loop",
        "item"      : "i",
        "iterator"  : "iterator",
        "statements": {
          "class" : "block",
          "states": [
            {
              "class"     : "loop",
              "item"      : "j",
              "iterator"  : "i",
              "statements": {
                "class": "expr",
                "expr" : [ "j", [ "+", "1" ] ]
              }
            }
          ]
        }
      }
    });

    it('should return void 0', () => {
      expect(loop.apply('functio')).to.be.equal(false);
    });

  });

});