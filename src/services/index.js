const users = require('./users/users.service.js');
const pdf = require('./pdf/pdf.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(pdf);
};
