const Joi = require("joi");
const schema = Joi.object({
  spec_id: Joi.number().required(),
  social_id: Joi.number().required(),
  social_link: Joi.string().required(),
});

module.exports = schema;
