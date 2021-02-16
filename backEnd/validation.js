const Joi = require("joi");

const registerValidation = (body) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    email: Joi.string().email().min(4).max(255).required(),
    password: Joi.string().min(6).max(1024).required(),
  });

  return schema.validate(body);
};

const signInValidation = (body) => {
  const schema = Joi.object({
    email: Joi.string().email().min(4).max(255).required(),
    password: Joi.string().min(6).max(1024).required(),
  });

  return schema.validate(body);
};

module.exports.registerValidation = registerValidation;
module.exports.signInValidation = signInValidation;
