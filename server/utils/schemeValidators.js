const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const registerSchema = Joi.object({
    first_name: Joi.string().required().label("First Name"),
    last_name: Joi.string().required().label("Last Name"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
});

const loginSchema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
});

module.exports = { registerSchema, loginSchema };

