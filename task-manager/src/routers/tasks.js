const express = require('express')
const Task = require('../models/task')
const router = new express.Router

router.get('/tasks', (req, res) => {
    Task.find({}).then((results) => {
        res.send(results)
    }).catch((err) => {
        res.status('500').send(err)
    })
})

router.get('/tasks/:id', (req, res) => {
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

router.post('/tasks', (req, res) => {
    const task = new Task(req.body)
    task.save().then(function callback(results) {
        res.send(results)
    }).catch(function callback(error) {
        res.status(400)
        res.send(error)
    })
})


router.patch('/tasks/:id', async (req, res) => {
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

        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        //     new: true,
        //     runValidators: true
        // })
        
        const task = await Task.findById(req.params.id)


        updates.forEach(function (update) {
            task[update] = req.body[update]
        })

        await task.save()


        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})


router.delete('/tasks/:id', async (req, res) => {
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


module.exports = router
