const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID

const id = new ObjectID()
console.log(id.getTimestamp())

const connURL = 'mongodb://127.0.0.1:27017'
const dbName = 'task-manager'

MongoClient.connect(connURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (error, client) => {
    if (error) {
        console.log('Unable to connect to the database')
    }
    const db = client.db(dbName)

    // db.collection('users').insertOne({
    //     name: 'Arth',
    //     age: '25'
    // }, (error, result) => {
    //     if(error){
    //         return console.log("Unable to insert user")
    //     }
    //     console.log(result.ops)
    // })

    // db.collection('users').insertMany([{
    //     name: "Jen",
    //     age: "26"
    // }, {
    //     name: "John",
    //     age: "35"
    // }], (err, res) => {
    //     if (err) {
    //         return console.log("Unable to Insert")
    //     }
    //     console.log(res.ops)
    // })

    // db.collection('tasks').insertMany([{
    //     description: "Laundry",
    //     completed: true
    // }, {
    //     description: "Cooking",
    //     completed: false
    // }, {
    //     description: "Driving",
    //     completed: true
    // }], function callback(err, res) {
    //     if (err) {
    //         return console.log(err)
    //     } else {
    //         console.log(res.ops)
    //     }
    // })

})