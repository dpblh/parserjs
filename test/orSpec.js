import { expect } from 'chai';
import {
  or, txt
} from '../src/roles';

describe('roles', () => {

  describe('or', () => {

    const def = or(txt('val'), txt('var'), txt('let'));

    it('should return one form ...', () => {
      for (let str of ['val', 'var', 'let'])
        expect(def.apply(str)).to.be.deep.equal({ res: str, pos: 3 });
    });

    it('should return void 0', () => {
      expect(def.apply('const')).to.be.equal(false);
    });

  });

});
