//const { authenticate } = require('@feathersjs/authentication').hooks;
const toPDF = require('./api/toPDF');

module.exports = {
  before: {
//    all: [ authenticate('jwt') ],
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [ toPDF ],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
