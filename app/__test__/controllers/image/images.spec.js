/* eslint-disable no-undef */
import appTest from '../../base/test_setup'
import chai from 'chai'

const { expect } = chai

import { token } from '../../utils'
import { image_error, user_error } from '../../../errors'
import { success_responses } from '../../../utils/responses'

const url = '/image'
const imageUrl = '/home/bendev/Pictures'

describe('image', async () => {
    describe('resize image', async () => {
        it(`should return ${user_error.notLoggedIn} if no token is provided`, async () => {
            try {
                await appTest
                    .post(url)
                    .send({ imageUrl })
                    .set('Authorization', `Bearer  heylo`)
            } catch (error) {
                expect(error).to.eql(user_error.notLoggedIn)
            }
        })
        it(`should return ${image_error.imageRequired} if no image url is provided`, async () => {
            try {
                await appTest
                    .post(url)
                    .send({})
                    .set('Authorization', `Bearer ${token}`)
            } catch (error) {
                expect(error).to.eql(new Error(image_error.imageRequired))
            }
        })
        it(`should return ${image_error.invalidImageUrl} if incorrect url is provided`, async () => {
            try {
                await appTest
                    .post(url)
                    .send({ imageUrl: 'https://image.com/image-photo/.on.jpg' })
                    .set('Authorization', `Bearer ${token}`)
            } catch (error) {
                expect(error).to.eql(new Error(image_error.invalidImageUrl))
            }
        })

        it(`should return ${image_error.invalidImage} if file is not an image`, async () => {
            try {
                await appTest
                    .post(url)
                    .send({ imageUrl: 'not so image-like' })
                    .set('Authorization', `Bearer ${token}`)
            } catch (error) {
                expect(error).to.eql(new Error(image_error.invalidImage))
            }
        })

        it('should return status 200 and success message if image thumbnailed successfully', async () => {
            const response = await appTest
                .post(url)
                .send({ imageUrl })
                .set('Authorization', `Bearer ${token}`)
            expect(response.status).to.equal(200)
            expect(response.body.data.message).to.equal(
                success_responses.successful_resize
            )
        })
    })
})
