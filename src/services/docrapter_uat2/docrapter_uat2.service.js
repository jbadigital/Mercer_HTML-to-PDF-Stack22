// Initializes the `pdf` service on path `/pdf`
const { Docrapter_uat2 } = require('./docrapter_uat2.class');
const hooks = require('./docrapter_uat2.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/docrapter_uat2', new Docrapter_uat2(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('docrapter_uat2');

  service.hooks(hooks);
};
