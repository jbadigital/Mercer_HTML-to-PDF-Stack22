// Initializes the `pdf` service on path `/pdf`
const { Docrapter_uat } = require('./docrapter_uat.class');
const hooks = require('./docrapter_uat.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/docrapter_uat', new Docrapter_uat(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('docrapter_uat');

  service.hooks(hooks);
};
