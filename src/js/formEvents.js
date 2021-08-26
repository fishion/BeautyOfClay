"use strict";

const config = require('../../config.json');
const formElement = document.getElementsByTagName('form')[0];

//const apiClient = require('contact-us-api-client')(config.form, formElement)
require('../../../ContactUsAPIClient')(config.form, formElement).addFormEvents();