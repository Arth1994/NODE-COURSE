const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/users')
const taskRouter = require('./routers/tasks')

const app = express()
//We set env which is the port Heroku will look for
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


const bcrypt = require('bcryptjs')



app.listen(port, () => {
    console.log("Server is running on port " + port)
})