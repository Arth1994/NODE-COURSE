const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
//We set env which is the port Heroku will look for
const port = process.env.PORT || 3000

app.use(express.json())

app.get('/users', (req, res) => {
    User.find({
    }).then(function callback(result) {
        res.send(result)
    }).catch(function callback(error) {
        res.status(500)
        console.log(error)
    })
})

app.get('/users/:id', (req, res) => {
    const Id = req.params.id
    User.findById(Id).then((result) => {
        if (!result) {
            return res.status('404').send()
        } else {
            res.send(result)
        }
    }).catch((error) => {
        res.status('500').send(error)
    })
})

app.get('/tasks', (req, res) => {
    Task.find({}).then((results) => {
        res.send(results)
    }).catch((err) => {
        res.status('500').send(err)
    })
})

app.get('/tasks/:id', (req, res) => {
    const Id = req.params.id
    Task.findById(Id).then((result) => {
        if (!result) {
            return res.status('404').send()
        } else {
            res.send(result)
        }
    }).catch((error) => {
        res.status('500').send(error)
    })
})

app.post('/tasks', (req, res) => {
    const task = new Task(req.body)
    task.save().then(function callback(results) {
        res.send(results)
    }).catch(function callback(error) {
        res.status(400)
        res.send(error)
    })
})

app.post('/users', (req, res) => {
    const user = new User(req.body)
    user.save().then(function callback(result) {
        res.send(user)
    }).catch(function callback(error) {
        res.status(400)
        res.send(error)
    })
})

app.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidoperations = updates.every(function (update) {
        return allowedUpdates.includes(update)
    })

    if (!isValidoperations) {
        return res.status(400).send({
            error: "It's an invalid operation"
        })
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})


app.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidoperations = updates.every(function (update) {
        return allowedUpdates.includes(update)
    })

    if (!isValidoperations) {
        return res.status(400).send({
            error: "It's an invalid operation"
        })
    }

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})


app.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

app.listen(port, () => {
    console.log("Server is running on port " + port)
})