const SFTP = require('ssh2-sftp-client');
const sftp = new SFTP();
const logger = require('./logger');

module.exports = async function (app) {

  await sftp.connect({
    host: process.env.FTP_HOST,
    port: process.env.FTP_PORT,
    username: process.env.FTP_USERNAME,
    password: process.env.FTP_PASSWORD,
    algorithms: {
      serverHostKey: ['ssh-rsa', 'ssh-dss']
    },
    readyTimeout: 400000000
  });
  await app.set('sftp', sftp);

  logger.info('SFTP CONNECTED');

};
