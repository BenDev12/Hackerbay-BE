/* eslint-disable no-undef */
import appTest from '../../base/test_setup'
import chai from 'chai'

import { user_error } from '../../../errors'

const { expect } = chai
const url = '/login'

describe('User login', () => {
    it('should return status code 404 if user provides valid creds', async () => {
        const response = await appTest.post(url).send({})
        expect(response.status).to.eql(404)
    })

    it('should return username is required if no username is provided', async () => {
        try {
            await appTest.post(url).send({
                password: 'test123',
            })
        } catch (error) {
            expect(error).to.eql(new Error(user_error.usernameRequired))
        }
    })

    it('should return password is required if user doesnot provide password', async () => {
        try {
            await appTest.post(url).send({
                username: 'bendev12',
            })
        } catch (error) {
            expect(error).to.eql(new Error(user_error.passwordRequired))
        }
    })

    it('should return invalid password if user provides password that does not meet required creteria', async () => {
        try {
            await appTest.post(url).send({
                username: 'bendev12',
                password: ' ',
            })
        } catch (error) {
            expect(error).to.eql(new Error(user_error.invalidPassword))
        }
    })

    it('Should login a user if valid credentials are provided', (done) => {
        appTest
            .post(url)
            .send({
                username: 'bendev12',
                password: 'password123D',
            })
            .then((response) => {
                expect(response.body.data.message).to.equal('login sucessful')
                expect(response.status).to.eql(200)
            })
        done()
    })
})
