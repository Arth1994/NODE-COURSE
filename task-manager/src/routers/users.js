const express = require('express')
const router = new express.Router()
const User = require('../models/user')

router.get('/users', (req, res) => {
    User.find({
    }).then(function callback(result) {
        res.send(result)
    }).catch(function callback(error) {
        res.status(500)
        console.log(error)
    })
})

router.get('/users/:id', (req, res) => {
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


router.post('/users', (req, res) => {
    const user = new User(req.body)
    user.save().then(function callback(result) {
        res.send(user)
    }).catch(function callback(error) {
        res.status(400)
        res.send(error)
    })
})

router.patch('/users/:id', async (req, res) => {
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

router.delete('/users/:id', async (req, res) => {
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

module.exports = router