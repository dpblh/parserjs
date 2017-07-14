import { expect } from 'chai';
import {
  parser
} from '../src/parser';

describe('parser', () => {

  const digest = parser((str, offset) => {
    let char = str.charAt(offset);
    return char >= "0" && char <= "9" && { res: char, pos: offset + 1 }
  });

  const digestInt = digest.then(string => +string);

  const digestIntWhiteSpace = digestInt.ws();
  const digestIntWhiteSpaceOptional = digestInt.opt().ws();

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

});