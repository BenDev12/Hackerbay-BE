import { signJwt } from '../../utils/jwt.utils'
import { userSchema } from '../../schema'
import { requestMiddleware } from '../../middlewares'

const login = async (req, res, next) => {
    const { password, username } = req.body
    const payload = {
        password,
        username,
    }
    const access_token = await signJwt(
        {
            ...payload,
        },
        {
            expiresIn: process.env.Tl,
        }
    )

    return res.status(200).json({
        data: {
            access_token,
            message: 'login sucessful',
        },
        success: true,
    })
}
export default requestMiddleware(login, { validation: { body: userSchema } })
