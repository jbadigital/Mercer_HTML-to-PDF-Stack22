const SFTP = require('ssh2-sftp-client');
const sftp_UAT2 = new SFTP();
const logger = require('./logger');

module.exports = async function (app) {

  await sftp_UAT2.connect({
    host: process.env.FTP_HOST_URL_UAT2,
    port: 22,
    username: process.env.FTP_USERNAME_UAT2,
    privateKey: Buffer.from(process.env.FTP_PRIVATEKEY_UAT2, 'base64').toString('ascii'),
    //debug: console.log,
    retries: 10,
    retry_factor: 2,
    retry_minTimeout: 2000,
    readyTimeout: 10000000,
    //keepaliveInterval: 72000000, // 20 hours Interval
    //keepaliveCountMax: 3
  });
  await app.set('sftp', sftp);

  logger.info('SFTP_UAT2 CONNECTED');

};
