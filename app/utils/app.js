import express from 'express'
import cors from 'cors'
import routes from '../routes/routes'
import { authenticate } from '../middlewares'

const createServer = () => {
    const app = express()
    app.use(express.json())
    app.use(cors())
    app.use(authenticate)

    routes(app)

    app.use((err, req, res, next) => {
        if (res.headersSent) {
            return next(err)
        }

        return res.status(err.status || 500).json({
            error: err.message,
        })
    })

    return app
}

export default createServer
