import download from 'image-downloader'
import sharp from 'sharp'
import { uuid } from 'uuidv4'

const path = require('path')
// const sharp = require('sharp')

export const downloader = async (url) => {
    try {
        const data = await download.image({
            url,
            dest: path.join(__dirname, '../public/images/downloads'),
        })
        return data
    } catch (error) {
        return error
    }
}

export const thumbnailImage = async (imagePath) => {
    try {
        const imageName = `${uuid()}.${imagePath.split('.')[1]}`

        const imageLocation = path.join(
            __dirname,
            `public/images/resized/${imageName}`
        )
        await sharp(imagePath)
            .resize(50, 50)
            .toFile(imageLocation, (error) => {
                if (error) return error
            })

        return imageLocation
    } catch (error) {
        return error
    }
}
