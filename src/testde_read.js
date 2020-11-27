require('dotenv').config();
const util = require('util')
var _ = require('underscore');

const ET_Client = require('sfmc-fuelsdk-node');
const client = new ET_Client(process.env.SFMC_CLIENTID, process.env.SFMC_CLIENTSECRET, null, { origin: process.env.SFMC_ORIGIN, authOrigin: process.env.SFMC_AUTHORIGIN, soapOrigin: process.env.SFMC_SOAPORIGIN, authOptions: { authVersion : 2, accountId : process.env.SFMC_ACCOUNTID, scope : process.env.SFMC_SCOPE, applicationType : 'server'}});


const props = ['GUID','DE_RowID','BRAND_TYPE','Communication_Name','PDF_Job_ID','PDF_Status'];
const filter = {
             leftOperand: 'GUID',
             operator: 'equals',
             rightOperand: 'BFE43CC5F8312315A161595F8448C9C065EE45DA'
         };
 client.dataExtensionRow({props, Name: 'Master_Send_Log_V2_UAT - 20201007', filter}).get((err, response) => {
     if (err) throw new Error(err);

     let SFMC={};

     SFMC.GUID = _.find(response.body.Results[0].Properties.Property,function(item){ return item.Name === 'GUID'; }).Value;
     console.log('SFMC.GUID: ', SFMC.GUID );

     SFMC.DE_RowID = _.find(response.body.Results[0].Properties.Property,function(item){ return item.Name === 'DE_RowID'; }).Value;
     console.log('SFMC.DE_RowID: ', SFMC.DE_RowID );

     SFMC.BRAND_TYPE = _.find(response.body.Results[0].Properties.Property,function(item){ return item.Name === 'BRAND_TYPE'; }).Value;
     console.log('SFMC.BRAND_TYPE: ', SFMC.BRAND_TYPE );

     SFMC.Communication_Name = _.find(response.body.Results[0].Properties.Property,function(item){ return item.Name === 'Communication_Name'; }).Value;
     console.log('SFMC.Communication_Name: ', SFMC.Communication_Name );

     SFMC.PDF_Job_ID = _.find(response.body.Results[0].Properties.Property,function(item){ return item.Name === 'PDF_Job_ID'; }).Value;
     console.log('SFMC.PDF_Job_ID: ', SFMC.PDF_Job_ID );

     SFMC.PDF_Status = _.find(response.body.Results[0].Properties.Property,function(item){ return item.Name === 'PDF_Status'; }).Value;
     console.log('SFMC.PDF_Status: ', SFMC.PDF_Status );

 });
