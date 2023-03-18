const request = require('supertest')
const app = require('../../../app')


it('This test case will create an cuisine', async () => {

    const token = global.signin()

    await request(app)
            .post('/api/cuisine')
            .set('token', token)
            .send({name: 'Desert', code: 'DST', status: true})

    const response = await request(app)
                            .get('/api/cuisine')
                            .set('token', token)
                            .send()

    console.log(response.body.data)

    expect(response.body.data.cuisineList.length).toEqual(1);
    expect(response.body.data.cuisineList[0].name).toEqual('Desert');
})

it('returns 400 status code if name is not provided', async () => {

    const token = global.signin()

    await request(app)
        .post('/api/cuisine')
        .set('token', token)
        .send({code: 'DST', status: true})
        .expect(400)
})