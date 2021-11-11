import { utilService } from "../../../services/util.service.js"
import { storageService } from "../../../services/async-storage.service.js"

export const noteService = {
    query,
    getById,
    pinNote,
    removeNote,
    addNote
}

const NOTE_STORAGE_KEY = 'notesStorage'

function query() {
    return storageService.query(NOTE_STORAGE_KEY)
}

function getById(noteId) {
    return storageService.get(NOTE_STORAGE_KEY, noteId)
}

function pinNote(noteId) {
    getById(noteId)
        .then(note => {
            note.isPinned = !note.isPinned
            storageService.put(NOTE_STORAGE_KEY, note)
            // _manipulateNoteIdx(note)
        })
}

function removeNote(noteId) {
    return storageService.remove(NOTE_STORAGE_KEY, noteId)
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
    if (note.type === 'note-txt') newNote.info['txt'] = txt
    if (note.type === 'note-todos') newNote = _processTodosNote(newNote, txt, title)
    if (note.type === 'note-img' || note.type === 'note-vid') {
        newNote.info['title'] = title
        newNote.info['url'] = txt
    }
    return storageService.post(NOTE_STORAGE_KEY, newNote)
}


function _save(note) {
    if (note.id) return storageService.put(NOTE_STORAGE_KEY, note)
    else return storageService.post(NOTE_STORAGE_KEY, note)
}
  
function _processTodosNote(note, txt, title) {
    let todosTrimmed = txt.split(',').map(todo => todo.trim())
    const todos = []
    for (let todo of todosTrimmed) {
        todos.push({ txt: todo, doneAt: null })
    }
    note.info.todos = todos
    note.info.label = title
    return note
}

function _manipulateNoteIdx(noteToMove) {
    return storageService.query(NOTE_STORAGE_KEY)
        .then(notes => {
            const idx = notes.findIndex(note => note.id === noteToMove.id)
            const pinned = notes.splice(idx, 1)
            pinned.isPinned ? notes.unshift(pinned) : notes.splice(idx, 0, pinned)
            console.log(...pinned);
            _save(pinned)
        })
}

function _saveNotes(newNotes) {
    let notesToSave = utilService.loadFromStorage(NOTE_STORAGE_KEY)
    if (!notesToSave || !notesToSave.length) {
        notesToSave = newNotes
        utilService.saveToStorage(NOTE_STORAGE_KEY, notesToSave)
    }
    return notesToSave
}

const dummyNotes = [
    {
        id: utilService.makeId(),
        type: "note-txt",
        isPinned: false,
        info: {
            txt: "Fullstack Me Baby!",
        },
    },
    {
        id: utilService.makeId(),
        type: "note-img",
        info: { 
            url: "https://w7.pngwing.com/pngs/70/60/png-transparent-vue-js-javascript-library-github-github-angle-text-triangle.png",
            title: "Bobi and Me" 
        },
        style: { 
            backgroundColor: "#00d" 
        },
        isPinned: false,
    },
    {
        id: utilService.makeId(),
        type: "note-todos",
        info: {
            label: "Get my stuff together",
            todos: [
                { txt: "Driving liscence", doneAt: null },
                { txt: "Coding power", doneAt: null },
            ],
        },
        isPinned: false,
    },
    {
        id: utilService.makeId(),
        type: "note-vid",
        info: {
            title: "Great video for a clip!",
            url: 'https://www.youtube.com/embed/8aGhZQkoFbQ'
        },
        isPinned: false,
    },
    {
        id: utilService.makeId(),
        type: "note-todos",
        info: {
            label: "Get my stuff together",
            todos: [
                { txt: "Driving liscence", doneAt: null },
                { txt: "Coding power", doneAt: null },
                { txt: "Coding power", doneAt: null },
                { txt: "Coding power", doneAt: null },
                { txt: "Coding power", doneAt: null },
            ],
        },
        isPinned: false,
    },
    {
        id: utilService.makeId(),
        type: "note-img",
        info: {
            url: "https://w7.pngwing.com/pngs/70/60/png-transparent-vue-js-javascript-library-github-github-angle-text-triangle.png",
            title: 'Vue.js'
        },
        isPinned: false,
    },
]
_saveNotes(dummyNotes)