import Joi from 'joi'

import { patch_error } from '../errors'

const patchKey = Joi.object().keys({
    op: Joi.string()
        .trim()
        .required()
        .valid('add', 'replace', 'replace', 'copy', 'move', 'test')
        .error((errors) => {
            errors.map((e) => {
                switch (e.code) {
                    case 'any.only':
                        return (e.message = patch_error.missingOpKey)
                    default:
                        return
                }
            })
            return errors
        }),
    path: Joi.string()
        .trim()
        .required()
        .error((errors) => {
            errors.map((e) => {
                switch (e.code) {
                    case 'string.empty':
                        return (e.message = patch_error.missingPathKey)
                    default:
                        return
                }
            })
            return errors
        }),
    value: Joi.string().trim(),
})

export const jsonSchema = Joi.object({
    document: Joi.object()
        .required()
        .error((errors) => {
            errors.map((e) => {
                switch (e.code) {
                    case 'any.required':
                        return (e.message = patch_error.missingDocument)

                    default:
                        break
                }
            })
            return errors
        }),
    patch: Joi.array()
        .items(patchKey.required())
        .required()
        .error((errors) => {
            errors.map((e) => {
                switch (e.code) {
                    case 'any.required':
                        return (e.message = patch_error.missingPatch)
                    default:
                        return
                }
            })
            return errors
        }),
})
