const Joi = require("joi");
const schema = Joi.object({
  spec_position: Joi.string().required().max(255).trim(),
  spec_last_name: Joi.string().required().max(42).trim(),
  spec_first_name: Joi.string().required().max(42).trim(),
  spec_middle_name: Joi.string().required().max(42).trim(),
  spec_birth_day: Joi.date(),
  spec_photo: Joi.string().max(255).default("image/default.png"),
  spec_phone_number: Joi.string().required().length(12),
  spec_password: Joi.string().required().min(6).max(32),
  spec_info: Joi.string(),
  spec_is_active: Joi.boolean().default(false),
  show_position: Joi.boolean().default(false),
  show_last_name: Joi.boolean().default(false),
  show_first_name: Joi.boolean().default(false),
  show_middle_name: Joi.boolean().default(false),
  show_photo: Joi.boolean().default(false),
  show_social: Joi.boolean().default(false),
  show_info: Joi.boolean().default(false),
  show_birth_day: Joi.boolean().default(false),
  show_phone_number: Joi.boolean().default(false),
  otp_id: Joi.string().max(42),
});

module.exports = schema;
