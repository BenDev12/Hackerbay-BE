import OperationsError from './wrapper.error'

class BadRequest extends OperationsError {
    constructor(message) {
        super(message || 'Bad request', 400)
    }
}
export default BadRequest
