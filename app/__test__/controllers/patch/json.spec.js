/* eslint-disable no-undef */
import appTest from '../../base/test_setup'
import chai from 'chai'

import { patch_error, user_error } from '../../../errors'
import { success_responses } from '../../../utils/responses'
import { token } from '../../utils'

const { expect } = chai

const url = '/json'
const data = {
    document: {
        firstname: 'bendev',
        lastname: '',
    },
    patch: [{ op: 'add', path: '/lastname', value: 'Joachim' }],
}

describe('patch json body', async () => {
    it('should return status 403 if user is not logged in or provides invalid token', async () => {
        try {
            await appTest.patch(url).send({ data })
        } catch (error) {
            expect(error).to.eql(user_error.notLoggedIn)
        }
    })
    it('should return document is required if document not provided', async () => {
        try {
            await appTest
                .patch(url)
                .send({})
                .set('Authorization', `Bearer ${token}`)
        } catch (error) {
            expect(error).to.eql(patch_error.missingDocument)
        }
    })

    it('should return patch is required if a user patch is not provided', async () => {
        try {
            await appTest
                .patch(url)
                .send({
                    document: { foo: 'boo' },
                })
                .set('Authorization', `Bearer ${token}`)
        } catch (error) {
            expect(error).to.eql(patch_error.missingPatch)
        }
    })

    it('should return patch object requires key "op" ', async () => {
        try {
            await appTest
                .patch(url)
                .send({
                    document: { foo: 'boo' },
                    patch: [{ path: '/foo', value: 'buzz' }],
                })
                .set('Authorization', `Bearer ${token}`)
        } catch (error) {
            expect(error).to.eql(patch_error.missingOpKey)
        }
    })

    it('should return patch object requires key "path"', async () => {
        try {
            await appTest.patch(url).send({
                document: { foo: 'boo' },
                patch: [{ op: 'replace', value: 'buzz' }],
            })
        } catch (error) {
            expect(error).to.eql(patch_error.missingPathKey)
        }
    })

    it('should patch document and return status code 200 if all required fields are provided', (done) => {
        appTest
            .patch(url)
            .send({ data })
            .set('Authorization', `Bearer ${token}`)
            .then((response) => {
                expect(response.status).to.eql(200)
                expect(response.body.data.message).to.eql(
                    success_responses.successful_patch
                )
            })

        done()
    })
})
