//const { authenticate } = require('@feathersjs/authentication').hooks;
const toPDF_uat = require('./api/toPDF_uat');

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
    create: [ toPDF_uat ],
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
