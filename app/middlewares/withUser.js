import BadRequest from '../errors/badRequests'
import { user_error } from '../errors'

export const withUser = (req, res, next) => {
    const user = res.locals.user
    if (!user) {
        return res.status(403).send(new BadRequest(user_error.notLoggedIn))
    }
    return next()
}
