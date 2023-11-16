import Joi from "joi";

import {constantsRegex} from "../assets/regex";

export const loginValidator = Joi.object({
    email: Joi.string().pattern(constantsRegex.EMAIL).required().messages({
        'string.empty': 'Поле \'email\' є обов\'язковим',
        'string.pattern.base': 'Невалідний email',
    }),
    password: Joi.string().required().min(8).messages({
        'string.empty': 'Поле \'password\' є обов\'язковим',
        'string.min': 'Не менше 8 символів'
    })
})