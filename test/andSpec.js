import { expect } from 'chai';
import {
  and, txt
} from '../src/roles';

describe('roles', () => {

  describe('and', () => {

    const exp = and(txt('name'), txt('='), txt('1'));

    it('should return array', () => {
      expect(exp.apply('name=1')).to.be.deep.equal({ res: ['name', '=', '1'], pos: 6 });
    });

    it('should return void 0', () => {
      expect(exp.apply('name>1')).to.be.equal(false);
    });

  });

});
