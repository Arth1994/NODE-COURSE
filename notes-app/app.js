const validator = require('validator')
const chalk = require('chalk')
const notes = require('./notes')
const yargs = require('yargs')



yargs.command({
    command: "add",
    describe: "Add a new Note",
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note Body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        notes.addNote(argv.title, argv.body);
    }
})

yargs.command({
    command: "remove",
    describe: "Remove a Note",
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        notes.removeNote(argv.title);
    }
})


yargs.command({
    command: "list",
    describe: "Listing Out all nodes",
    handler: function () {
        notes.listAllNotes();
    }
})

yargs.command({
    command: "read",
    describe: "Reading a Note",
    handler: function (argv) {
        notes.readNote(argv.title);
    }
})


yargs.parse()