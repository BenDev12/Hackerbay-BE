import jwt from 'jsonwebtoken'

/**
 * @param  {object} payload
 * @returns token
 */
export const signJwt = (object, options) => {
    return jwt.sign(object, process.env.SECRET_KEY, {
        ...(options && options),
        // algorithm:"RS256"
    })
}

/**
 * @param {string} token
 * @returns decoded user token or expired message
 */
export const verifyJwt = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        return {
            valid: true,
            expired: false,
            decoded,
        }
    } catch (error) {
        return {
            valid: false,
            expired: error.message === 'jwt expired',
            decoded: null,
        }
    }
}
