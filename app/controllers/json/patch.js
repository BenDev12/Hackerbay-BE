import { requestMiddleware } from '../../middlewares'
import { jsonSchema } from '../../schema'
import jsonpatch from 'fast-json-patch'

import { success_responses } from '../../utils/responses'

const patch = async (req, res, next) => {
    const { document, patch } = req.body
    const { newDocument } = jsonpatch.applyPatch(document, patch)
    return res.status(200).json({
        data: {
            message: success_responses.successful_patch,
            newDocument,
        },
        success: true,
    })
}
export default requestMiddleware(patch, { validation: { body: jsonSchema } })
