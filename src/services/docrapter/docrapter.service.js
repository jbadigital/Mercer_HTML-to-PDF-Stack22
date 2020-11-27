// Initializes the `pdf` service on path `/pdf`
const { Docrapter } = require('./docrapter.class');
const hooks = require('./docrapter.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/docrapter', new Docrapter(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('docrapter');

  service.hooks(hooks);
};
