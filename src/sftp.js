const SFTP = require('ssh2-sftp-client');
const sftp = new SFTP();
const logger = require('./logger');

module.exports = async function (app) {

  await sftp.connect({
    host: process.env.FTP_HOST,
    port: process.env.FTP_PORT,
    username: process.env.FTP_USERNAME,
    password: process.env.FTP_PASSWORD,
    //debug: console.log,
    algorithms: {
      serverHostKey: ['ssh-rsa', 'ssh-dss']
    },
    //retries: 10,
    //retry_factor: 2,
    //retry_minTimeout: 2000,
    //readyTimeout: 10000000,
    //keepaliveInterval: 72000000, // 20 hours Interval
    //keepaliveCountMax: 3
  });
  await app.set('sftp', sftp);

  logger.info('SFTP CONNECTED');

};
