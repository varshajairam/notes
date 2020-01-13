const fs = require('fs');
const notes = require('./notes');
const yargs = require('yargs');

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv){
        notes.addNotes(argv.title, argv.body);
    }
});

yargs.command({
    command: 'remove',
    describe: 'Remove the note',
    builder: {
        title : {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv){
        notes.removeNotes(argv.title);
    }
})

yargs.command({
    command: 'list',
    describe: 'List all notes',
    handler: function(){
        notes.listNotes();
    }
})

yargs.command({
    command: 'read',
    describe: 'Read the note',
    builder : {
        title : {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv){
        notes.readNote(argv.title);
    }
})

yargs.parse();

//console.log(yargs.argv);