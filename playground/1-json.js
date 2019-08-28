const fs = require('fs')

const readJsonData = fs.readFileSync("1-json.json")
const stringData = readJsonData.toString()
const jsonData = JSON.parse(stringData)
jsonData.name = "Arth"
jsonData.planet = "Earth"
jsonData.age = 25
const newString = JSON.stringify(jsonData)
console.log(newString)