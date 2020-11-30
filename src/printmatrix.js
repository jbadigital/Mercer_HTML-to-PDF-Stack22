const logger = require('./logger');
var _ = require('underscore');
const ET_Client = require('sfmc-fuelsdk-node');

let printmatrix={};

module.exports = function (app) {

  const client = new ET_Client(process.env.SFMC_CLIENTID, process.env.SFMC_CLIENTSECRET, null, { origin: process.env.SFMC_ORIGIN, authOrigin: process.env.SFMC_AUTHORIGIN, soapOrigin: process.env.SFMC_SOAPORIGIN, authOptions: { authVersion : 2, accountId : process.env.SFMC_ACCOUNTID, scope : process.env.SFMC_SCOPE, applicationType : 'server'}});
  const props = ['Communication_Name','Destination Directory'];
  const filter = {
    leftOperand: 'Destination Directory',
    operator: 'notEquals',
    rightOperand: ' '
  };
  client.dataExtensionRow({props, Name: 'PDF Print Matrix', filter}).get((err, response) => {
    if (err) throw new Error(err);


    _.each(response.body.Results, function(item, i) {

      printmatrix[ _.find(response.body.Results[i].Properties.Property,function(item){ return item.Name === 'Communication_Name'; }).Value ] =
        {
          'Communication_Name': _.find(response.body.Results[i].Properties.Property,function(item){ return item.Name === 'Communication_Name'; }).Value,
          'Destination_Directory': _.find(response.body.Results[i].Properties.Property,function(item){ return item.Name === 'Destination Directory'; }).Value

        };

    })

  app.set('printmatrix', printmatrix);

  logger.info('PRINTMATRIX CONNECTED');

});

};
