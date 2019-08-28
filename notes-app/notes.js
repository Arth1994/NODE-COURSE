const fs = require('fs')
const chalk = require('chalk')

const addNote = function (title, body) {
    const notes = loadNotes()

    const dupNotes = notes.filter(filterByTitle);

    function filterByTitle(note) {
        return note.title == title;
    }

    if (dupNotes.length == 0) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse("New Note Added"));
    } else {
        console.log(chalk.red.inverse("Title Already Taken"));
    }

}

function removeNote(title) {
    const loadedNotes = loadNotes();
    var flag = 0;
    loadedNotes.forEach(function (element) {
        if (element.title == title) {
            flag = 1;
        }
    });
    if (flag == 1) {
        const newArrayWithRemovedElement = loadedNotes.filter(function (ele) {
            return ele.title != title;
        });
        console.log(chalk.green.inverse("Removed Note with title: " + title));
        chalk.green()
        saveNotes(newArrayWithRemovedElement)
    } else {
        console.log(chalk.red.inverse("Title not found "));
        return loadedNotes;
    }
}

function readNote(title) {
    const loadedNotes = loadNotes();
    var found = loadedNotes.find((element) => {
        return element.title == title;
    });
    if (found != undefined) {
        console.log(chalk.green(found.title + " " + found.body));
    } else {
        console.log(chalk.red(found));
    }
}


function listAllNotes() {
    const loadedNotes = loadNotes();
    console.log(chalk.green.bold("Title " + " Body"));
    loadedNotes.forEach(function (ele) {
        console.log(chalk.green.blue.bold(ele.title + " " + ele.body));
    });
}


const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync("notes.json", dataJSON)
}


const loadNotes = function () {
    try {
        const dataBuffer = fs.readFileSync("notes.json")
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}


module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listAllNotes: listAllNotes,
    readNote: readNote
}