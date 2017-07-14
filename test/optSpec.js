import { expect } from 'chai';
import {
  opt, txt
} from '../src/roles';

describe('roles', () => {

  describe('opt', () => {

    const option = opt(txt('function'));

    it('should return \'function\'', () => {
      expect(option.apply('function')).to.be.deep.equal({ res: 'function', pos: 8 });
    });

    it('should return void 0', () => {
      expect(option.apply('functio')).to.be.deep.equal({ res: undefined, pos: 0 });
    });


  });

});
