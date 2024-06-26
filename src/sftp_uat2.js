const SFTP = require('ssh2-sftp-client');
const sftp_UAT2 = new SFTP();
const logger = require('./logger');

module.exports = async function (app) {

  await sftp_UAT2.connect({
    host: process.env.FTP_HOST_URL_UAT2,
    port: 22,
    username: process.env.FTP_USERNAME_UAT2,
    privateKey: Buffer.from(process.env.FTP_PRIVATEKEY_UAT2, 'base64').toString('ascii'),
    debug: console.log,
    readyTimeout: 20000, // integer How long (in ms) to wait for the SSH handshake
    strictVendor: true, // boolean - Performs a strict server vendor check
    retries: 2, // integer. Number of times to retry connecting
    retry_factor: 2, // integer. Time factor used to calculate time between retries
    retry_minTimeout: 2000, // integer. Minimum timeout between attempts
    promiseLimit: 10 // max concurrent promises for downloadDir/uploadDir
    //keepaliveInterval: 60000
  });
  await app.set('sftp_UAT2', sftp_UAT2);

  logger.info('SFTP_UAT2 CONNECTED');

  setInterval(function() {
    var t = sftp.stat('/');
  }, (4* 60 * 1000));  
};
