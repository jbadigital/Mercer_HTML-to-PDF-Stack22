const SFTP = require('ssh2-sftp-client');
const sftp_UAT = new SFTP();
const logger_UAT = require('./logger');

module.exports = async function (app) {

  await sftp_UAT.connect({
    host: process.env.FTP_HOST_UAT,
    port: process.env.FTP_PORT_UAT,
    username: process.env.FTP_USERNAME_UAT,
    password: process.env.FTP_PASSWORD_UAT,
//    debug: console.log,
//    algorithms: {
//      serverHostKey: ['ssh-rsa', 'ssh-dss']
//    },
    retries: 10,
    retry_factor: 2,
    retry_minTimeout: 2000,
    readyTimeout: 10000000
  });
  await app.set('sftp_UAT', sftp_UAT);

  logger_UAT.info('SFTP_UAT CONNECTED');

};

