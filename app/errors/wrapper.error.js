class OperationsError extends Error {
    constructor(message) {
        super(message.toString())
        this.code = message.error
        this.name = message
    }
}
export default OperationsError
