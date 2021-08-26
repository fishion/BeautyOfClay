"use strict";

const config = require('../../config.json');
const formElement = document.getElementsByTagName('form')[0];

// require('../../../ContactUsAPIClient')(config.form, formElement).addFormEvents();
require('contact-us-api-client')(config.form, formElement).addFormEvents();