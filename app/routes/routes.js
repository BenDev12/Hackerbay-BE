import swaggerUi from 'swagger-ui-express'
import apiSpec from '../../openapi.json'
import * as PatchController from '../controllers/json'
import * as UserController from '../controllers/user'
import * as ImageController from '../controllers/images'
import { withUser } from '../middlewares'

const apiv = '/api/v1'
const swaggerUiOptions = {
    customCss: '.swagger-ui .topbar { display: none }',
}

const routes = (app) => {
    app.use(`${apiv}/healthcheck`, (req, res) => {
        return res.status(200).json({
            message: 'Welcome to hackerbay.io backend interview challenge',
        })
    })

    app.patch(`${apiv}/json`, withUser, PatchController.patch)
    app.post(`${apiv}/thumbnail`, withUser, ImageController.imageResize)
    app.post(`${apiv}/login`, UserController.login)

    if (process.env.NODE_ENV === 'development') {
        app.use(`${apiv}/dev/api-docs`, swaggerUi.serve)
        app.get(
            `${apiv}/dev/api-docs`,
            swaggerUi.setup(apiSpec, swaggerUiOptions)
        )
    }
}
export default routes
