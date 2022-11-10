const Joi = require("joi");
const schema = Joi.object({
  admin_name: Joi.string().required(),
  admin_phone_number: Joi.string().required().length(12),
  admin_password: Joi.string().required().min(6).trim(),
  admin_is_active: Joi.boolean().default(false),
  admin_is_creator: Joi.boolean().default(false),
});

module.exports = schema;
