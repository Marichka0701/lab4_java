import Joi from "joi";

import {constantsRegex} from "../assets/regex";

export const updateUserValidator = Joi.object({
    first_name: Joi.string().required().optional().messages({
        'string.empty': 'Поле \'first name\' є обов\'язковим',
    }),
    last_name: Joi.string().required().optional().messages({
        'string.empty': 'Поле \'last name\' є обов\'язковим',
    }),
})