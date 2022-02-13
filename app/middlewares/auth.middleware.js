import { verifyJwt } from '../utils/jwt.utils'

export const authenticate = async (req, res, next) => {
    const tokenData = req.header('Authorization') || req.header('authorization')

    if (!tokenData) {
        return next()
    }
    const token = tokenData.replace(/^Bearer\s/, '')
    const { decoded } = verifyJwt(token)

    if (decoded) {
        res.locals.user = decoded
        return next()
    }

    return next()
}
export default authenticate
