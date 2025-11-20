//import { generateForm, type ContactFormConfig } from '../../../contact-us-api-client/dist'
import { generateForm, type ContactFormConfig } from "contact-us-api-client"
import config from "../../config.json" with { type: "json" }

export default {
  formHTML: generateForm(config.form as ContactFormConfig),
}
