import { expect } from 'chai';
import {
  reg
} from '../src/roles';

describe('roles', () => {

  describe('reg', () => {

    const digest = reg(/\d+/);

    it('should return parsed RegExp', () => {
      expect(digest.apply('12345')).to.be.deep.equal({ res: '12345', pos: 5 });
    });

    it('should return void 0', () => {
      expect(digest.apply('qwe')).to.be.equal(false);
    });

  });

});
