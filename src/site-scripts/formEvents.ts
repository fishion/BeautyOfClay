import config from "../../config.json"
import { addFormEvents, type ContactFormConfig } from "contact-us-api-client"

const formElement = document.getElementsByTagName("form")[0]
addFormEvents(formElement, config.form as ContactFormConfig)
