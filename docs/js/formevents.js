/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/contact-us-api-client/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/contact-us-api-client/index.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const formEvents        = __webpack_require__(/*! ./lib/form-events.js */ "./node_modules/contact-us-api-client/lib/form-events.js");
const recaptchaEvents   = __webpack_require__(/*! ./lib/recaptcha-events.js */ "./node_modules/contact-us-api-client/lib/recaptcha-events.js");
const validateFormData  = __webpack_require__(/*! ./lib/validate-form-data.js */ "./node_modules/contact-us-api-client/lib/validate-form-data.js");

module.exports = (config, form) => {

  function generateForm() {
    const fieldsHTML = config.expectedFormData.map(field => {
      const formEl = field.name == 'message' ?
        `<textarea name="${field.name}"></textarea>` :
        `<input type="text" name="${field.name}">`
      return `
        <div id="formField_${field.name}">
           ${formEl}
           <label>${field.niceName}${field.validation ? ' *' : ''}</label>
         </div>`
    }).join('');
    
    return `
      <form>
        <div id="form_generalError"></div>
        ${fieldsHTML}
        <div>
          <button type="button">Send</button>
        </div>
      </form>
    `;
  }


  function addFormEvents({
    contentClass  = true,
    recaptcha     = true
  } = {}) {
    const fe = formEvents(form, config);
    const formButton = form.getElementsByTagName('button')[0];

    if (contentClass) fe.addContentClass();

    if (recaptcha){
      // set initForm method on window object, so grecaptcha can call it once loaded
      window.initForm = () => {
        const re = recaptchaEvents(form, config['recaptcha2-site-secret']);
        fe.afterSubmit = () => { grecaptcha.reset() } // reset catpcha after submit

        var recaptchaId = re.addRecaptcha( () => {fe.submitForm()} )
        formButton.addEventListener('click', 
          () => { fe.validate() && grecaptcha.execute(recaptchaId) } 
        )
      }
    } else {
      formButton.addEventListener('click', () => { fe.validate() && fe.submitForm() })
    }
  }


  return {
    generateForm      : generateForm,
    addFormEvents     : addFormEvents,
    validateFormData  : validateFormData,
  };
}

/***/ }),

/***/ "./node_modules/contact-us-api-client/lib/form-events.js":
/*!***************************************************************!*\
  !*** ./node_modules/contact-us-api-client/lib/form-events.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const validateFormData  = __webpack_require__(/*! ./validate-form-data.js */ "./node_modules/contact-us-api-client/lib/validate-form-data.js")

module.exports = function(form, config) {
  // hooks for additional behaviour
  const afterSubmit = () => {}

  // Add class to input/testarea element on keyup if the value
  // contains any non-whitespace characters.
  // Could do this all in CSS with pseudo selector "input:valid"
  // if all fields are required https://css-tricks.com/float-labels-css/
  function addContentClass(){
    form.addEventListener('keyup', e => {
      if (e.target.value.match(/[^\s]/)) {
        e.target.classList.add('hascontent')
      } else {
        e.target.classList.remove('hascontent')
      }
    });
  }

  // Form validation
  function validate() {
    _clearFeedback(form);
    const [_, errors] = validateFormData(_getFormData(form), config.expectedFormData)
    if (Object.keys(errors).length) {
      _showErrors(errors);
      return false;
    }
    return true;
  }

  // submit the form over API 
  async function submitForm() {
    const formData = _getFormData(form);
    // post the data to the contactus API
    const response = await fetch(config.contactUsAPI, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      body: JSON.stringify({ siteKey : config.siteKey, ...formData })
    })
    const responseData = await response.json();
  
    if (response.status == '400'){
      _showErrors(responseData.error)
    } else if (response.status == '200') {
      _showSuccess(`Message received - Thank you!`)
      _clearForm();
    }
    
    this.afterSubmit()
  }

  // private methods 

  function _clearFeedback () {
    const errorTexts = form.getElementsByClassName('error');
    const successTexts = form.getElementsByClassName('success');
    [...errorTexts, ...successTexts].forEach(el => {el.remove()});
  }

  function _getFormData () {
    const inputFields = form.getElementsByTagName('input');
    const textareaFields = form.getElementsByTagName('textarea');
    return [...inputFields, ...textareaFields].reduce((fd, item) => {
      return {[item.name]: item.value, ...fd}}, {}
    )
  }

  function _clearForm () {
    const inputFields = form.getElementsByTagName('input');
    const textareaFields = form.getElementsByTagName('textarea');
    [...inputFields, ...textareaFields].forEach(el => {
      el.value = '';
      el.classList.remove('hascontent');
    })
  }

  function _showErrors (error) {
    if (typeof error === 'string') {
      document.getElementById('form_generalError')
        .appendChild(_feedbackElement(`Error : ${error}`, 'error'))
    } else {
      document.getElementById('form_generalError')
        .appendChild(_feedbackElement('Please check errors below', 'error'))
      Object.keys(error).forEach(field => {
        document.getElementById(`formField_${field}`)
          .appendChild(_feedbackElement(error[field], 'error'))
      })
    }
  }

  function _showSuccess (message) {
    document.getElementById('form_generalError')
      .appendChild(_feedbackElement(message, 'success'))
  }

  function _feedbackElement (message, type) {
    const p = document.createElement('p');
    if (type) p.classList.add(type);
    p.textContent = message;
    return p;
  }

  return {
    afterSubmit     : afterSubmit,
    addContentClass : addContentClass,
    validate        : validate,
    submitForm      : submitForm
  }
}





/***/ }),

/***/ "./node_modules/contact-us-api-client/lib/recaptcha-events.js":
/*!********************************************************************!*\
  !*** ./node_modules/contact-us-api-client/lib/recaptcha-events.js ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = (form, secret) => {

  function addRecaptcha(callback) {
    const recapture_div = document.createElement('div');
    recapture_div.classList.add("g-recaptcha");
    form.appendChild(recapture_div)

    const recaptchaId = grecaptcha.render(recapture_div,{
      'sitekey': secret,
      'size': 'invisible',
      'badge' : 'bottomright',
      'callback' : callback
    });
    return recaptchaId;
  }

  return {
    addRecaptcha: addRecaptcha
  }

}

/***/ }),

/***/ "./node_modules/contact-us-api-client/lib/validate-form-data.js":
/*!**********************************************************************!*\
  !*** ./node_modules/contact-us-api-client/lib/validate-form-data.js ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = (data, expectedData) => {
  const errors = {};
  const strings = [];
  
  expectedData.forEach(field => {
    if (data[field.name]){
      switch (field.validation && field.validation.type){
        case 'email':
          if (!data[field.name].match(/.*@.*\..*/))
          errors[field.name] = field.validation.error
          break;
        case undefined:
          break;
        default:
          throw(`Validation type '${field.validation}' not defined`)
      };
      strings.push(`${field.niceName || field.name} : ${data[field.name]}`);
    } else if (field.required){
      errors[field.name] = field.required
    }
  })
  return [strings, errors];
}

/***/ }),

/***/ "./config.json":
/*!*********************!*\
  !*** ./config.json ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"paths":{"controllerPath":"src/controller","pagesPath":"src/view/page","wrappersPath":"src/view/partials/wrappers","includesPath":"src/view/partials/includes","sassInputPath":"src/sass","sassOutputPath":"docs/css","sassFiles":["main","normalize"]},"galleryPaths":{"gallery":"img/gallery/","workshop":"img/workshop/","festival":"img/festival/"},"slideshow":{"imagesPath":"img/slideshow","secondsPerImage":6},"site":{"title":"Beauty of Clay","url":"https://www.beautyofclay.co.uk","description":"I am Monir, I run low-cost pottery and ceramic workshops for people of all ages. No experience is necessary and all materials are provided. If you are interested in attending my weekly pottery workshops, please contact me on mahmoniramiri@gmail.com. My workshops include creating and glazing tiles based on your own design, and ceramic jewellery making.","og-description":"#pottery #clay #beauty #art #DIY","og-type":"Low-cost pottery and ceramic workshops for people of all ages","author":"Maytree House Studios","themeColour":"rgb(27, 45, 75)","twitterHandle":""},"form":{"recaptcha2-site-secret":"6LdOWmkaAAAAAAXH3BvOKcI2wrq53-qq3bjtSR2s","contactUsAPI":"https://api.maytreehousestudios.co.uk/contact-us","siteKey":"beautyofclay","expectedFormData":[{"name":"name","niceName":"Name"},{"name":"email","niceName":"Email","validation":{"type":"email","error":"Please enter a valid Email Address"},"required":"No email address provided"},{"name":"whereHear","niceName":"Where did you hear about us"},{"name":"message","niceName":"Message","required":"Please enter your message to us here"}]}}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!******************************!*\
  !*** ./src/js/formevents.js ***!
  \******************************/


const config = __webpack_require__(/*! ../../config.json */ "./config.json");
const formElement = document.getElementsByTagName('form')[0];

// require('../../../ContactUsAPIClient')(config.form, formElement).addFormEvents();
__webpack_require__(/*! contact-us-api-client */ "./node_modules/contact-us-api-client/index.js")(config.form, formElement).addFormEvents();
})();

/******/ })()
;