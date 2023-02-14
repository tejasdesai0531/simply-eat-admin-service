const express = require('express')
const app = express()
const cors = require('cors')

const indexRouter = require('./modules/route')

app.use(express.json())
app.use(cors())

app.use('/api', indexRouter)




app.use((err, req, res, next) => {
    res.status(400).send({
        errors: [{ message: 'Something went wrong' }]
    })
})

module.exports = app