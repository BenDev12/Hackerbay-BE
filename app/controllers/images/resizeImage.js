import { imageSchema } from '../../schema'
import { requestMiddleware } from '../../middlewares'
import { downloader, thumbnailImage } from '../../utils/image.utils'
import { success_responses } from '../../utils/responses'

const imageResize = async (req, res, next) => {
    const { imageUrl } = req.body
    const { filename } = await downloader(imageUrl)
    if (!filename) {
        return res.status(400).json({
            error: {
                message: 'invalid image path',
            },
            success: false,
        })
    }
    const path = await thumbnailImage(filename)
    return res.status(200).json({
        data: {
            imagePath: path,
            message: success_responses.successful_resize,
        },
        success: true,
    })
}

export default requestMiddleware(imageResize, {
    validation: {
        body: imageSchema,
    },
})
