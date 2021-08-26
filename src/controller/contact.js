"use strict";

const path = require('path');
const config = require(path.resolve(__dirname, '..', '..', 'config.json'));
//const apiClient = require('contact-us-api-client')(config.form);
const apiClient = require('../../../ContactUsAPIClient')(config.form);

module.exports = {
  formHTML : apiClient.generateForm()
};