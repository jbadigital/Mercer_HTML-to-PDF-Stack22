const users = require('./users/users.service.js');
const pdf = require('./pdf/pdf.service.js');
const docrapter = require('./docrapter/docrapter.service.js');
const pdf_uat = require('./pdf_uat/pdf_uat.service.js');
const docrapter_uat = require('./docrapter_uat/docrapter_uat.service.js');
const pdf_uat2 = require('./pdf_uat2/pdf_uat2.service.js');
const docrapter_uat2 = require('./docrapter_uat2/docrapter_uat2.service.js');

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(pdf);
  app.configure(docrapter);
  app.configure(pdf_uat);
  app.configure(docrapter_uat);
  app.configure(pdf_uat2);
  app.configure(docrapter_uat2);
};
