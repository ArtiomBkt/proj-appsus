import { utilService } from "../../../services/util.service.js"
import { storageService } from "../../../services/async-storage.service.js"

export const noteService = {
    query,
    getById,
    getDummyNotes,
    addNote
}

const NOTE_STORAGE_KEY = 'notesStorage'

const notes = [
    {
        id: utilService.makeId(),
        type: "note-txt",
        isPinned: true,
        info: {
            txt: "Fullstack Me Baby!",
        },
    },
    {
        id: "n102",
        type: "note-img",
        info: { 
            url: "http://some-img/me",
            title: "Bobi and Me" 
        },
        style: { 
            backgroundColor: "#00d" 
        }
    },
    {
        id: "n103",
        type: "note-todos",
        info: {
            label: "Get my stuff together",
            todos: [
                { txt: "Driving liscence", doneAt: null },
                { txt: "Coding power", doneAt: 187111111 },
            ],
        },
    },
]

function getDummyNotes() {
    return notes
}

function query() {
    return storageService.query(NOTE_STORAGE_KEY)
}

function getById(noteId) {
    return storageService.get(NOTE_STORAGE_KEY, noteId)
}

function addNote(note) {
    const { title, txt, type } = note
    let newNote = {
        id: utilService.makeId(),
        info: {},
        isPinned: false,
        type,
        style: null
    }
    if (note.type === 'note-txt') newNote.info = txt
    if (note.type === 'note-todos') newNote = processTodosNote(newNote, txt, title)
    if (note.type === 'note-img' || note.type === 'note-vid') {
        newNote.info['title'] = title
        newNote.info['url'] = txt
    }
    storageService.post(NOTE_STORAGE_KEY, newNote)
}

function processTodosNote(note, txt, title) {
    let todosTrimmed = txt.split(',').map(todo => todo.trim())
    const todos = []
    for (let todo of todosTrimmed) {
        todos.push({ txt: todo, doneAt: null })
    }
    note.info.todos = todos
    note.info.label = title
    return note
}

function _saveNotes(notes) {
    let notesToSave = null
    query(NOTE_STORAGE_KEY)
        .then(notes => notesToSave = notes)

    if (!notesToSave || !notesToSave.length) {
        notesToSave = notes
        storageService.postMany(NOTE_STORAGE_KEY, notes)
    }
    return notes
}

// _saveNotes(notes)