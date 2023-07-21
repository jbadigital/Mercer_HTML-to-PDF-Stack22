require('dotenv').config();
var _ = require('underscore');
const axios = require('axios');
const logger = require('./../../../logger');
const ET_Client = require('sfmc-fuelsdk-node');
const { DateTime } = require('luxon');

module.exports = function(context) {

  if (context.app.settings.ERRORS >= 3) return;

  (async function () {
    try {

      const pdf = await axios({
        method: 'get',
        url: context.result.download_url,
        responseType: 'arraybuffer',
        responseEncoding: 'binary'
      });

      const client = new ET_Client(process.env.SFMC_CLIENTID, process.env.SFMC_CLIENTSECRET, null, { origin: process.env.SFMC_ORIGIN, authOrigin: process.env.SFMC_AUTHORIGIN, soapOrigin: process.env.SFMC_SOAPORIGIN, authOptions: { authVersion : 2, accountId : process.env.SFMC_ACCOUNTID, scope : process.env.SFMC_SCOPE, applicationType : 'server'}});
      const props = ['PDF_Status','Communication_Name','BRAND_TYPE','Interaction_Name','GUID','PDF_Document_Name'];
      const filter = {
        leftOperand: 'PDF_Status',
        operator: 'equals',
        rightOperand: context.result.download_id
      };

      client.dataExtensionRow({props, Name: 'Master_Send_Log_V2', filter}).get((err, response) => {
      //client.dataExtensionRow({props, Name: 'Master_Send_Log_V2_UAT - 20201007', filter}).get((err, response) => {

        if (err) throw new Error(err);

        let SFMC={};

        SFMC.PDF_Status = _.find(response.body.Results[0].Properties.Property,function(item){ return item.Name === 'PDF_Status'; }).Value;
        SFMC.Communication_Name = _.find(response.body.Results[0].Properties.Property,function(item){ return item.Name === 'Communication_Name'; }).Value;
        SFMC.Brand_Type = _.find(response.body.Results[0].Properties.Property,function(item){ return item.Name === 'BRAND_TYPE'; }).Value;
        SFMC.Interaction_Name = _.find(response.body.Results[0].Properties.Property,function(item){ return item.Name === 'Interaction_Name'; }).Value;
        SFMC.GUID_Code = _.find(response.body.Results[0].Properties.Property,function(item){ return item.Name === 'GUID'; }).Value;
        SFMC.PDF_Document_Name = _.find(response.body.Results[0].Properties.Property,function(item){ return item.Name === 'PDF_Document_Name'; }).Value;

        var dt = DateTime.local();
        //let filename=SFMC.Communication_Name+'_'+context.result.download_id+'_'+dt.toFormat('yyyy-MM-dd')+'T'+dt.toFormat('HH-mm-ss')+'.pdf';

        //let filename = SFMC.Brand_Type + '-' + SFMC.Interaction_Name + '-' + dt.toFormat('yyyy-MM-dd')+'T'+dt.toFormat('HH-mm-ss') + '-' + SFMC.GUID_Code + '.pdf';
        let filename = SFMC.PDF_Document_Name;

        (async function () {
          try {

            await context.app.settings.sftp.put(Buffer.from(pdf.data), context.app.settings.printmatrix[SFMC.Communication_Name].Destination_Directory+filename);

            const keyField = {Name: 'PDF_Status', FieldType: 'Text', IsPrimaryKey: false, IsRequired: false, MaxLength: 100};
            const props={};
            props.PDF_Status=context.result.download_id;
            props.PDF_Print_Processed = 1;
            props.PDF_Document_Name = filename;

            client.dataExtensionRow({props,keyField,Name: 'HTML to PDF - Status Log'}).patch((err, response) => {

              if (err) throw new Error(err);

            });


          } catch (err) {
            logger.error(err);
            return;
          }
        })();

      });

      return;
    } catch (err) {

      logger.error(err);

      context.app.set('ERRORS', (context.app.settings.ERRORS+1));
      logger.error('total errors '+context.app.settings.ERRORS);

      return;

    }
  })();

};
