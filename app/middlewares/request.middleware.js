import BadRequest from '../errors/badRequests'
import logger from '../utils/logger'

const MessageFromJoiError = (error) => {
    if (!error.details && error.message) {
        return error.message
    }
    return error.details && error.details.length > 0 && error.details[0].message
        ? `${error.details[0].message}`
        : undefined
}

export const requestMiddleware =
    (handler, options) => async (req, res, next) => {
        if (options.validation.body) {
            const { error } = options.validation.body.validate(req.body)

            if (error != null) {
                next(new BadRequest(MessageFromJoiError(error)))
                return
            }
        }

        try {
            await handler(req, res, null)
            next()
        } catch (err) {
            if (process.env.NODE_ENV === 'development') {
                logger.error({
                    level: 'error',
                    message: 'Error in request handler',
                    error: err.message,
                })
            }
            next(err)
        }
    }

export default requestMiddleware
