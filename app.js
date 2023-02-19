const express = require('express')
const app = express()
const cors = require('cors')

const indexRouter = require('./modules/route')
const CustomError = require('./errors/custom-error')
const NotFoundError = require('./errors/not-found-error')

const errorHandler = require('./middlewares/error-handler')

app.use(express.json())
app.use(cors())

app.use('/api', indexRouter)

app.all('*', async (req, res, next) => {
    try {
        throw new NotFoundError()
    } catch (error) {
        next(error)
    }
})


app.use(errorHandler)

module.exports = app