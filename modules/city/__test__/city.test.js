const request = require('supertest')
const app = require('../../../app')
const CountryModel = require('../../../models/country.model')


it('This test case will create an city', async () => {

    const token = global.signin()

    let country = await CountryModel.addCountry({name: 'India', code: 'IND', status: true})

    console.log("Country ID : ", country.id)

    await request(app)
            .post('/api/city')
            .set('token', token)
            .send({name: 'Mumbai', code: 'MUM', status: true, countryId: country.id})

    const response = await request(app)
                            .get('/api/city')
                            .set('token', token)
                            .send()

    console.log(response.body.data)

    expect(response.body.data.cityList.length).toEqual(1);
    expect(response.body.data.cityList[0].name).toEqual('Mumbai')

})

