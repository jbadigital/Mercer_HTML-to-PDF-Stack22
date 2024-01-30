// Initializes the `pdf` service on path `/pdf`
const { Pdf_uat } = require('./pdf_uat.class');
const hooks = require('./pdf_uat.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/pdf_uat', new Pdf_uat(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('pdf_uat');

  service.hooks(hooks);
};
