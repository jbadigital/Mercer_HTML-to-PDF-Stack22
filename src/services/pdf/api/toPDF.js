require('dotenv').config();
const feathers = require('@feathersjs/feathers');
const app = feathers();
const axios = require('axios');
const got = require('got');
const logger = require('./../../../logger');

const { v4: uuidv4 } = require('uuid');

module.exports = function(context) {

  (async function () {
    try {

      const html = await got(context.result.html);

      const response = await axios({
        method: 'post',
        url: 'https://docraptor.com/docs',
        responseType: 'arraybuffer',
        responseEncoding: 'binary',
        headers: {
          'Content-Type': 'application/json',
          'encoding': null
        },
        data: JSON.stringify({
          user_credentials: process.env.DOCRAPTER_KEY,
          doc: {
            document_content: html.body,
            type: "pdf",
            test: process.env.DOCRAPTER_TEST
          }
        })
      });

      await context.app.settings.sftp.put(Buffer.from(response.data), '/Import/t/sample_'+uuidv4()+'.pdf');

      return;
    } catch (err) {

      logger.error(err);

      return;

    }
  })();

};
