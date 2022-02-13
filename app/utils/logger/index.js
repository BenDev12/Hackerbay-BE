import logger from 'pino'

const day = () => new Date(Date.now()).toISOString()

const log = logger({
    prettyPrint: true,
    base: {
        pid: false,
    },
    timestamp: () => `, "time":"${day()}`,
})

export default log
