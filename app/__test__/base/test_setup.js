import supertest from 'supertest'
import createServer from '../../utils/app'

const apiVersion = 'api/v1'
const app = createServer()

class appTest {
    static app = supertest(app)

    static post(url) {
        const request = this.app.post(`${apiVersion}${url}`)
        return request
    }

    static patch(url) {
        const request = this.app.patch(`${apiVersion}${url}`)
        return request
    }
}
export default appTest
