require('dotenv').config();
const axios = require('axios');
const testdata = require('./../test/testdata');

console.log(process.env.SERVER);

testdata().slice(0, 50).forEach(async (item) => {

    const response = await axios({
      method: 'post',
      url: process.env.SERVER+'pdf',
      headers: {
        'Authorization': 'Bearer '+process.env.TEST_LOAD_TOKEN,
        'Content-Type': 'application/json'
      },
      data : JSON.stringify({'brand':'X','html':item})
    });
    console.log(item);


});
