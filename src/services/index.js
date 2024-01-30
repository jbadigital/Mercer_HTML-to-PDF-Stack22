const users = require('./users/users.service.js');
const pdf = require('./pdf/pdf.service.js');
const docrapter = require('./docrapter/docrapter.service.js');
const pdf_uat = require('./pdf_uat/pdf_uat.service.js');
const docrapter_uat = require('./docrapter_uat/docrapter_uat.service.js');

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(pdf);
  app.configure(docrapter);
  app.configure(pdf_uat);
  app.configure(docrapter_uat);
};
