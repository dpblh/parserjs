'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Parser = function Parser(apply) {
  var _this = this;

  _classCallCheck(this, Parser);

  this.whiteSpace = /\s*/;

  this.apply = function (str) {
    var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    return _this._apply(str, offset) || false;
  };

  this.then = function (transform) {
    return parser(function (str, offset) {
      var res = _this.apply(str, offset);
      return res && { res: transform(res.res), pos: res.pos };
    });
  };

  this.ws = function () {
    return parser(function (str, offset) {
      var res = _this.whiteSpace.exec(str.substr(offset));
      return res && _this.apply(str, offset + res[0].length);
    });
  };

  this.opt = function () {
    return parser(function (str, offset) {
      return _this.apply(str, offset) || { res: undefined, pos: offset };
    });
  };

  this.not = function (p) {
    return parser(function (str, offset) {
      var res = _this.apply(str, offset);
      return res && !p.apply(str, offset) && res;
    });
  };

  this.rep = function () {
    return parser(function (str, offset) {
      var result = [],
          res = void 0;
      while (res = _this.apply(str, offset)) {
        result.push(res.res);
        offset = res.pos;
      }
      return { res: result, pos: offset };
    });
  };

  this._apply = apply;
};

var parser = function parser(apply) {
  return new Parser(apply);
};

var txt = function txt(str2) {
  return parser(function (str, offset) {
    return str.substr(offset, str2.length) == str2 && { res: str2, pos: offset + str2.length };
  });
};

var reg = function reg(regexp) {
  return parser(function (str, offset) {
    var res = regexp.exec(str.substr(offset));
    return res && res.index === 0 && { res: res[0], pos: offset + res[0].length };
  });
};



var rep = function rep(pars) {
  return parser(function (str, offset) {
    var result = [],
        res = void 0;
    while (res = pars.apply(str, offset)) {
      result.push(res.res);
      offset = res.pos;
    }
    return { res: result, pos: offset };
  });
};

var or = function or() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return parser(function (str, offset) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = args[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var value = _step.value;

        var res = value.apply(str, offset);
        if (res) return res;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  });
};

var and = function and() {
  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return parser(function (str, offset) {
    var result = [];

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = args[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var value = _step2.value;

        var res = value.apply(str, offset);
        if (!res) return;
        offset = res.pos;
        result.push(res.res);
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    return { res: result, pos: offset };
  });
};

var index = {
  parser: parser,

  txt: txt,
  reg: reg,
  and: and,
  or: or,
  rep: rep
};

module.exports = index;
//# sourceMappingURL=index.js.map
