import { expect } from 'chai';
import {
  txt,
  reg,
  and
} from '../src/roles';

describe('example', () => {

  const protocol  = reg(/[a-z]+/);
  const host      = reg(/[a-z\d]+(\.[a-z\d]+)*/);
  const path      = reg(/(\/[A-Za-z\.]+)+/);
  const search    = reg(/\?([A-Za-z]+=[a-z\d]+)*/);
  const hash      = reg(/#[a-z\d]+/);

  const location = and(protocol, txt('://'), host, path.opt(), search.opt(), hash.opt()).then(([protocol, q, host, path, search, hash]) => ({
    protocol,
    host,
    path,
    search,
    hash
  }));


  describe('location', () => {

    it('should return location', () => {

      expect(location.apply('https://jira.teko.io/secure/Dashboard.jspa?asd=ad#asd')).to.be.deep.equal({
        res: {
          protocol: 'https',
          host    : 'jira.teko.io',
          path    : '/secure/Dashboard.jspa',
          search  : '?asd=ad',
          hash    : '#asd'
        },
        pos: 53
      });

      expect(location.apply('https://jira.teko.io')).to.be.deep.equal({
        res: {
          protocol: 'https',
          host    : 'jira.teko.io',
          path    : undefined,
          search  : undefined,
          hash    : undefined
        },
        pos: 20
      });

      expect(location.apply('https://jira.teko.io?asd=ad')).to.be.deep.equal({
        res: {
          protocol: 'https',
          host    : 'jira.teko.io',
          path    : undefined,
          search  : "?asd=ad",
          hash    : undefined
        },
        pos: 27
      });

      expect(location.apply('https://jira.teko.io#qwe')).to.be.deep.equal({
        res: {
          protocol: 'https',
          host    : 'jira.teko.io',
          path    : undefined,
          search  : undefined,
          hash    : "#qwe"
        },
        pos: 24
      });

      expect(location.apply('https://jira.teko.io/secure/Dashboard')).to.be.deep.equal({
        res: {
          protocol: 'https',
          host    : 'jira.teko.io',
          path    : "/secure/Dashboard",
          search  : undefined,
          hash    : undefined
        },
        pos: 37
      });

      expect(location.apply('http://192.168.10.127/secure/Dashboard')).to.be.deep.equal({
        res: {
          protocol: 'http',
          host    : '192.168.10.127',
          path    : "/secure/Dashboard",
          search  : undefined,
          hash    : undefined
        },
        pos: 38
      });

    });

    it('should return void 0', () => {
      expect(location.apply('functio')).to.be.equal(false);
    });

  });

});