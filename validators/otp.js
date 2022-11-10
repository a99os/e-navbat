const Joi = require("joi");
const schema = Joi.object({
  otp: Joi.string().required().trim(),
  expiration_time: Joi.date(),
  verified: Joi.boolean().default(false),
});

module.exports = schema;
