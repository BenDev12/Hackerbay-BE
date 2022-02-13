import Joi from 'joi'

import { image_error } from '../errors/operationErrors'

export const imageSchema = Joi.object({
    imageUrl: Joi.string()
        .required()
        .pattern(/\.(jpg|jpeg|tiff|png)$/i)
        .error((errors) => {
            errors.map((e) => {
                switch (e.code) {
                    case 'any.required':
                        return (e.message = image_error.imageRequired)

                    case 'string.pattern.base':
                        return (e.message = image_error.invalidImage)

                    default:
                        return
                }
            })
            return errors
        }),
})
