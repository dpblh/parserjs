import { expect } from 'chai';
import {
  txt
} from '../src/roles';

describe('roles', () => {

  describe('txt', () => {

    const charA = txt('function');

    it('should return parsed string', () => {
      expect(charA.apply('function')).to.be.deep.equal({ res: 'function', pos: 8 });
    });

    it('should return void 0', () => {
      expect(charA.apply('functio')).to.be.equal(false);
    });

  });

});
