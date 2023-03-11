const request = require('supertest')
const app = require('../../../app')


it('This test case will create an city', async () => {

    await request(app).post('/api/city').send({name: 'Mumbai', code: 'MUM', status: true})

    const response = await request(app).get('/api/city').send()

    console.log(response.body.data)

    expect(response.body.data.cityList.length).toEqual(1);
    expect(response.body.data.cityList[0].name).toEqual('Mumbai');
})

