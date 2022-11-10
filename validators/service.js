const Joi = require("joi");

const schema = Joi.object({
  service_name: Joi.string().required().max(255).trim(),
  service_price: Joi.number().required(),
});

module.exports = schema;
