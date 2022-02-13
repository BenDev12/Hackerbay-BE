import Joi from 'joi'
import { user_error } from '../errors'

export const userSchema = Joi.object().keys({
    username: Joi.string()
        .alphanum()
        .min(3)
        .required()
        .error((errors) => {
            errors.map((e) => {
                switch (e.code) {
                    case 'any.required':
                        return (e.message = user_error.usernameRequired)

                    case 'string.min' || 'string.max':
                        return (e.message = user_error.invalidUsername)

                    default:
                        return
                }
            })
            return errors
        }),
    password: Joi.string()
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)
        .required()
        .error((errors) => {
            errors.map((e) => {
                switch (e.code) {
                    case 'any.required':
                        return (e.message = user_error.passwordRequired)

                    case 'string.pattern.base':
                        return (e.message = user_error.invalidPassword)

                    case 'string.empty':
                        return (e.message = user_error.invalidPassword)

                    default:
                }
            })
            return errors
        }),
})
