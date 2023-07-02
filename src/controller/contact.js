'use strict'

const path = require('path')
  , config = require(path.resolve(__dirname, '..', '..', 'config.json'))
// const apiClient = require('../../../ContactUsAPIClient')(config.form);
const apiClient = require('contact-us-api-client')(config.form)

module.exports = {
  formHTML : apiClient.generateForm()
}
