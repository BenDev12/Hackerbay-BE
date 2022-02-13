// import 'regenerator-runtime/runtime'
import createServer from './utils/app'
import logger from './utils/logger'
import dotenv from 'dotenv'

const result = dotenv.config()
if (result.error) {
    dotenv.config({
        path: '.env.default',
    })
}

const PORT = process.env.PORT || 4000

const app = createServer()

app.listen(PORT, () => {
    logger.info(`server is running at http://localhost:${PORT}`)
    if (process.env.NODE_ENV === 'development') {
        // This route is only present in development mode
        logger.info(
            `swagger UI hosted at http://localhost:${PORT}/api/v1/dev/api-docs`
        )
    }
})
