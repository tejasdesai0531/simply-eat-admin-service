const request = require('supertest')
const app = require('../../../app')


it('it can create country', async () => {

    const token = global.signin()

    await request(app)
            .post('/api/country')
            .set('token', token)
            .send({name: 'India', code: 'IND', status: true})

    const response = await request(app)
                            .get('/api/country')
                            .set('token', token)
                            .send()

    console.log(response.body)

    expect(response.body.data.countryList.length).toEqual(1);
    expect(response.body.data.countryList[0].name).toEqual('India');
})

it('check for duplicate country code', async () => {

    const token = global.signin()

    await request(app)
            .post('/api/country')
            .set('token', token)
            .send({name: 'India', code: 'IND', status: true})
    await request(app)
            .post('/api/country')
            .set('token', token)
            .send({name: 'India', code: 'IND', status: true})
            .expect(400)

})

it('it can update country', async () => {

    await request(app).put('/api/country').send({name: 'India', code: 'IND', status: true})

    const response = await request(app).get('/api/country').send()

    console.log(response.body)

    expect(response.body.data.countryList.length).toEqual(1);
    expect(response.body.data.countryList[0].name).toEqual('India');
})