require('dotenv').config();
const _ = require('underscore');
const assert = require('assert');
const app = require('../../src/app');
//const logger = require('../../src/logger');
const pMap = require('p-map');

const items = _.map([...Array(3).keys()], function(){ return {html:process.env.TEST_FILE}; });

describe('\'docs\' service', () => {
  it('registered the service', () => {
    const service = app.service('docs');
    assert.ok(service, 'Registered the service');
  });

  before(async () => {

    const mapper = async item => {
      const doc = await app.service('docs').create({
        brand: 'default',
        html: item.html
      });
      return doc;
    };
    await pMap(items, mapper, {concurrency: 2});

  });

  it('creates a docs', async () => {

    //  put test here

  });
});
