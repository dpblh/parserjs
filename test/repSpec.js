import { expect } from 'chai';
import {
  rep, reg
} from '../src/roles';

describe('roles', () => {

  describe('rep', () => {

    const digest = rep(reg(/\d/));
    const digestInt = digest.then(array => +array.join(""));

    it('should return array digest', () => {
      expect(digest.apply('12345')).to.be.deep.equal({ res: ['1','2','3','4','5'], pos: 5 });
    });

    it('should return empty array', () => {
      expect(digest.apply('')).to.be.deep.equal({ res: [], pos: 0 });
    });

    it('should return digest', () => {
      expect(digestInt.apply('12345')).to.be.deep.equal({ res: 12345, pos: 5 });
    });

  });

});
