"use strict";

const formConfig = require('../../config.json').form;
const formElement = document.getElementsByTagName('form')[0];

// require('../../../ContactUsAPIClient')(formConfig, formElement).addFormEvents();
require('contact-us-api-client')(formConfig, formElement).addFormEvents();