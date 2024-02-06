var EventEmitter = require('events').EventEmitter;

var LastFmBase = function () {
  EventEmitter.call(this);
};

LastFmBase.prototype = Object.create(EventEmitter.prototype);

// Custom each function
function each(obj, callback) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      callback(obj[key], key);
    }
  }
}

LastFmBase.prototype.registerHandlers = function (handlers) {
  if (typeof handlers !== 'object') {
    return;
  }

  var that = this;
  each(handlers, function (value, key) {
    that.on(key, value);
  });
};

var defaultBlacklist = ['error', 'success', 'handlers'];
LastFmBase.prototype.filterParameters = function (parameters, blacklist) {
  var filteredParams = {};
  each(parameters, function (value, key) {
    if (isBlackListed(key)) {
      return;
    }
    filteredParams[key] = value;
  });
  return filteredParams;

  function isBlackListed(name) {
    return (
      defaultBlacklist.indexOf(name) !== -1 ||
      (blacklist && blacklist.indexOf(name) !== -1)
    );
  }
};

LastFmBase.prototype.scheduleCallback = function (callback, delay) {
  return setTimeout(callback, delay);
};

LastFmBase.prototype.cancelCallback = function (identifier) {
  clearTimeout(identifier);
};

module.exports = LastFmBase;
