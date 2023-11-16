import Joi from "joi";

import {constantsRegex} from "../assets/regex";

export const registrationValidator = Joi.object({
    first_name: Joi.string().required().messages({
        'string.empty': 'Поле \'first name\' є обов\'язковим',
    }),
    last_name: Joi.string().required().messages({
        'string.empty': 'Поле \'last name\' є обов\'язковим',
    }),
    email: Joi.string().pattern(constantsRegex.EMAIL).required().messages({
        'string.empty': 'Поле \'email\' є обов\'язковим',
        'string.pattern.base': 'Невалідний email',
    }),
    password: Joi.string().required().min(8).messages({
        'string.empty': 'Поле \'password\' є обов\'язковим',
        'string.min': 'Не менше 8 символів'
    })
})