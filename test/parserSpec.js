import { expect } from 'chai';
import {
  parser
} from '../src/parser';
import {
  txt
} from '../src/roles';

describe('parser', () => {

  const digest = parser((str, offset) => {
    let char = str.charAt(offset);
    return char >= "0" && char <= "9" && { res: char, pos: offset + 1 }
  });

  const digestInt = digest.then(string => +string);

  const digestIntWhiteSpace = digestInt.ws();
  const digestIntWhiteSpaceOptional = digestInt.opt().ws();

  const without7 = digestInt.not(txt('7'));
  const without7repeat = without7.rep().then(array => +array.join(''));

  const digestAnd = digestInt.and(txt('a'));
  const digestAndl = digestInt.andl(txt('a'));
  const digestAndr = digestInt.andr(txt('a'));

  describe('digest', () => {

    it('should return parsed string', () => {
      for (let str of '1234567890')
        expect(digest.apply(str)).to.be.deep.equal({ res: str, pos: 1 });
    });

    it('should return void 0', () => {
      for (let str of 'qwertyuiop')
        expect(digest.apply(str)).to.be.equal(false);
    });

  });

  describe('should return transform value', () => {
    expect(digestInt.apply('3')).to.be.deep.equal({ res: 3, pos: 1 });
  });

  describe('should be skip white space', () => {
    expect(digestIntWhiteSpace.apply('         3')).to.be.deep.equal({ res: 3, pos: 10 });
  });

  describe('should be optional', () => {
    expect(digestIntWhiteSpaceOptional.apply('       3')).to.be.deep.equal({ res: 3, pos: 8 });
    expect(digestIntWhiteSpaceOptional.apply('       ')).to.be.deep.equal({ res: undefined, pos: 7 });
  });

  describe('should be not', () => {
    expect(without7.apply('1')).to.be.deep.equal({ res: 1, pos: 1 });
    expect(without7.apply('7')).to.be.deep.equal(false);
  });

  describe('should be repeat', () => {
    expect(without7repeat.apply('1121123')).to.be.deep.equal({ res: 1121123, pos: 7 });
    expect(without7repeat.apply('127132')).to.be.deep.equal({ res: 12, pos: 2 });
  });

  describe('should be and', () => {
    expect(digestAnd.apply('1a')).to.be.deep.equal({ res: [ 1, 'a' ], pos: 2 });
    expect(txt('a').and(txt('b')).and(txt('c')).apply('abc')).to.be.deep.equal({ res: [ 'a', 'b', 'c' ], pos: 3 });
  });

  describe('should be andl', () => {
    expect(digestAndl.apply('1a')).to.be.deep.equal({ res: 1, pos: 2 });
    expect(txt('a').andl(txt('b')).andl(txt('c')).apply('abc')).to.be.deep.equal({ res: 'a', pos: 3 });
    expect(txt('a').and(txt('b')).andl(txt('c')).apply('abc')).to.be.deep.equal({ res: [ 'a', 'b' ], pos: 3 });
  });

  describe('should be andr', () => {
    expect(digestAndr.apply('1a')).to.be.deep.equal({ res: 'a', pos: 2 });
    expect(txt('a').and(txt('b')).andr(txt('c')).apply('abc')).to.be.deep.equal({ res: 'c', pos: 3 });
  });

});
