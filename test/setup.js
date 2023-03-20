const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server');
const jwt = require('jsonwebtoken')

let mongo;
beforeAll(async () => {

    process.env.JWT_KEY = 'asdfasdf';

    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri()

    console.log("+++++++")
    console.log(mongoUri)

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
})

beforeEach(async () => {
    jest.clearAllMocks();
    const collections = await mongoose.connection.db.collections();

    for(let collection of collections) {
        await collection.deleteMany({})
    }
})

afterAll(async () => {
    await mongo.stop()
    await mongoose.connection.close();
})


global.signin = () => {
    // Build a JWT payload.  { id, email }
    const payload = {
      id: new mongoose.Types.ObjectId().toHexString(),
      email: 'test@test.com',
    };
  
    // Create the JWT!
    const token = jwt.sign(payload, process.env.JWT_KEY);
  
    return token
  };