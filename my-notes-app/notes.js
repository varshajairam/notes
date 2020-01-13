const fs = require('fs');
const chalk = require('chalk');

const addNotes = function(title, body) {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title);

    if(!duplicateNote){
        notes.push({
            'title': title,
            'body': body
        });
        console.log(chalk.green.inverse('Note is added!'));
    } else {
        console.log(chalk.red.inverse('Note title already exists!'));
    }
    
    saveNotes(notes);
}

const removeNotes = function(title) {
    const notes = loadNotes();
    const newNotes = notes.filter((note) => note.title !== title);
    if(notes.length === newNotes.length){
        console.log(chalk.red.inverse('No note found'));
    } else {
        saveNotes(newNotes);
        console.log(chalk.green.inverse('Note removed!'));
    }      
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.blue.bold('Your Notes: '));
    notes.forEach((note) => {
        console.log(note.title);
    })
}

const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find((note) => note.title === title);
    if(note){
        console.log(chalk.blue.bold(note.title));
        console.log(note.body);
    } else {
        console.log(chalk.red.inverse('Note not found'));
    }
}

const saveNotes = function(notes) {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = function(){
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
}

module.exports = {
    'addNotes' : addNotes,
    'removeNotes' : removeNotes,
    'listNotes': listNotes,
    'readNote': readNote
};