import { expect } from 'chai';
import {
  txt,
  reg,
  and
} from '../src/roles';

describe('example', () => {

  const String = txt("'").andr(reg(/([А-Яа-я]|[A-Za-z]|Ё|ё|\d|\s|\\'(?!$)|\\|\||\.|\(|\)|{|}|]|\[|\/|"|!|=|-|,|\?|_|\+|>|\^|@|#|\$|&|<|~|`|±|¡|™|£|¢|∞|§|¶|•|ª|º|–|≠|№|;|%|:|\*)*/)).andl(txt("'"));

  describe('location', () => {

    it('should return location', () => {

      expect(String.apply("'1234567890'")).to.be.deep.equal({
        res: "1234567890",
        pos: 12
      });

      expect(String.apply("'qwertyuiopasdfghjklzxcvbnm'")).to.be.deep.equal({
        res: "qwertyuiopasdfghjklzxcvbnm",
        pos: 28
      });

      expect(String.apply("'йцукенгшщзхъфывапролджэячсмитьбюё'")).to.be.deep.equal({
        res: "йцукенгшщзхъфывапролджэячсмитьбюё",
        pos: 35
      });

      expect(String.apply("'!№;%:?*()_+{}|:?><~`§±!¡™£¢∞§¶•ªº–≠№;%:?*()_@#\\$&-=^'")).to.be.deep.equal({
        res: "!№;%:?*()_+{}|:?><~`§±!¡™£¢∞§¶•ªº–≠№;%:?*()_@#\\$&-=^",
        pos: 54
      });

      expect(String.apply("'\\'123'")).to.be.deep.equal({
        res: "\\'123",
        pos: 7
      });

      expect(String.apply("'\\1'")).to.be.deep.equal({
        res: "\\1",
        pos: 4
      });

      expect(String.apply("'\\'")).to.be.deep.equal({
        res: "\\",
        pos: 3
      });

      expect(String.apply("'1234567890-=qwertyuiop[]asdfghjkl;\\'\\`zxcvbnm,./!@#$%^&*()_+QWIOP{}ASDFGKL:\"|~ZXCVBNM<>?!\"№;%:?*()_+ЙЦУКЕНГШЩЗХЪФЫВАПРЛДЖЭЯЧСМИТЬБЮ,[йцукенгшщзхъфывапролджэ\\]ячсмитьбю.'")).to.be.deep.equal({
        res: "1234567890-=qwertyuiop[]asdfghjkl;\\'\\`zxcvbnm,./!@#$%^&*()_+QWIOP{}ASDFGKL:\"|~ZXCVBNM<>?!\"№;%:?*()_+ЙЦУКЕНГШЩЗХЪФЫВАПРЛДЖЭЯЧСМИТЬБЮ,[йцукенгшщзхъфывапролджэ\\]ячсмитьбю.",
        pos: 170
      });

    });

  });

});
