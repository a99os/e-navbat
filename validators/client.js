const Joi = require("joi");
const schema = Joi.object({
  client_first_name: Joi.string().required().max(42).trim(),
  client_last_name: Joi.string().required().max(42).trim(),
  client_phone_number: Joi.string().required().max(42).trim(),
  client_password: Joi.string().required().max(42).trim(),
  client_info: Joi.string().max(255).trim(),
  client_photo: Joi.string().max(255).default("image/default.png"),
  client_is_active: Joi.boolean().default(false),
  otp_id: Joi.string().max(42),
}); 

module.exports = schema;
