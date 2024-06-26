const SFTP = require('ssh2-sftp-client');
const sftp = new SFTP();
const logger = require('./logger');

module.exports = async function (app) {

  //await sftp.connect({
    //host: process.env.FTP_HOST,
    //port: process.env.FTP_PORT,
    //username: process.env.FTP_USERNAME,
    //password: process.env.FTP_PASSWORD,
    //debug: console.log,
    //algorithms: {
      //serverHostKey: ['ssh-rsa', 'ssh-dss']
    //},
    //retries: 10,
    //retry_factor: 2,
    //retry_minTimeout: 2000,
    //readyTimeout: 10000000,
    //keepaliveInterval: 72000000, // 20 hours Interval
    //keepaliveCountMax: 3
  //});
  //await app.set('sftp', sftp);

  await sftp.connect({
    host: process.env.FTP_HOST,
    port: 22,
    username: process.env.FTP_USERNAME,
    password: process.env.FTP_PASSWORD,
    debug: console.log,
    readyTimeout: 20000, // integer How long (in ms) to wait for the SSH handshake
    strictVendor: true, // boolean - Performs a strict server vendor check
    retries: 2, // integer. Number of times to retry connecting
    retry_factor: 2, // integer. Time factor used to calculate time between retries
    retry_minTimeout: 2000, // integer. Minimum timeout between attempts
    promiseLimit: 10 // max concurrent promises for downloadDir/uploadDir
    //keepaliveInterval: 60000
  });
  await app.set('sftp', sftp);

  logger.info('SFTP CONNECTED');

};
