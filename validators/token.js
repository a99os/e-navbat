const Joi = require("joi");
const schema = Joi.object({
  table_name: Joi.string().required().trim(),
  user_id: Joi.number().required(),
  user_os: Joi.string().required().trim(),
  user_device: Joi.string().required().trim(),
  token: Joi.string().required().trim(),
});

module.exports = schema;
