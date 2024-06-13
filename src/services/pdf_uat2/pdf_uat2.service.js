// Initializes the `pdf` service on path `/pdf`
const { Pdf_uat2 } = require('./pdf_uat2.class');
const hooks = require('./pdf_uat2.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/pdf_uat2', new Pdf_uat2(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('pdf_uat2');

  service.hooks(hooks);
};
