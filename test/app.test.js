require('dotenv').config();
const assert = require('assert').strict;
const axios = require('axios');
const testdata = require('./testdata');


describe('Application tests', () => {

  it('shows the index page', async () => {
    const { data } = await axios.get(process.env.SERVER);

    assert.ok(data.indexOf('<html lang="en">') !== -1);
  });

  describe('404', function() {
    it('shows a 404 HTML page', async () => {
      try {
        await axios.get(process.env.SERVER+'path/to/nowhere', {
          headers: {
            'Accept': 'text/html'
          }
        });
        assert.fail('should never get here');
      } catch (error) {
        const { response } = error;

        assert.equal(response.status, 404);
        assert.ok(response.data.indexOf('<html>') !== -1);
      }
    });

    it('shows a 404 JSON error without stack trace', async () => {
      try {
        await axios.get(process.env.SERVER+'path/to/nowhere', {
          json: true
        });
        assert.fail('should never get here');
      } catch (error) {
        const { response } = error;

        assert.equal(response.status, 404);
        assert.equal(response.data.code, 404);
        assert.equal(response.data.message, 'Page not found');
        assert.equal(response.data.name, 'NotFound');
      }
    });
  });

  describe('application', function() {

    let accessToken = '';

    it('authenticates', async () => {
      try {
        const { data } = await axios.post(process.env.SERVER+'authentication', {
          headers: {
            'Accept': 'text/html',
            'Content-Type': 'application/json'
          },
          'strategy': 'local',
          'email': process.env.USERNAME,
          'password': process.env.PASSWORD
        });
        assert.ok(typeof(data.accessToken) === 'string');
        accessToken = data.accessToken;

        console.log(data.accessToken);
      } catch (error) {
        const { response } = error;
        assert.equal(response.status, 500);
        assert.fail('application did not athenticate');
      }

    });

    testdata().slice(0, 5).forEach(async (item) => {

      it('processes the HTML found at '+item+' to PDF', async () => {

        const response = await axios({
          method: 'post',
          url: process.env.SERVER+'pdf',
          headers: {
            'Authorization': 'Bearer '+accessToken,
            'Content-Type': 'application/json'
          },
          data : JSON.stringify({'brand':'X','html':item})
        });
        assert.equal(response.status, 201);

      });


    });

  });


});
