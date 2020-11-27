require('dotenv').config();
const axios = require('axios');
const logger = require('./../../../logger');

module.exports = async function(context) {

  if (context.app.settings.ERRORS >= 3) return

  try {

    const html = await axios(context.result.html);

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
          async: true,
          callback_url: process.env.DOCRAPTER_CALLBACK,
          document_content: html.data,
          type: 'pdf',
          test: process.env.DOCRAPTER_TEST
        }
      })
    });

    context.result = {
      ...context.data,
      status_id:JSON.parse(response.data.toString()).status_id
    }

    return context;

  } catch (err) {

    logger.error(err);

    context.app.set('ERRORS', (context.app.settings.ERRORS+1));
    logger.error('total errors '+context.app.settings.ERRORS);

    return;

  }

}
