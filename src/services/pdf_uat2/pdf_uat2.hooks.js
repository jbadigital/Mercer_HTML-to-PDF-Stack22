//const { authenticate } = require('@feathersjs/authentication').hooks;
const toPDF_uat2 = require('./api/toPDF_uat2');

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
    create: [ toPDF_uat2 ],
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
