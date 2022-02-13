const validate = (SchemaFunc) => (req, res, next) => {
    try {
        SchemaFunc.validate({
            body: req.body,
        })
        next()
    } catch (e) {
        return res.status(400).send(e.errors)
    }
}

export default validate
