// Initializes the `pdf` service on path `/pdf`
const { Pdf } = require('./pdf.class');
const hooks = require('./pdf.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/pdf', new Pdf(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('pdf');

  service.hooks(hooks);
};
