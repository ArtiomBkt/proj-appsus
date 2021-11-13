import { eventBus } from '../../../services/event-bus.service.js'
import { msgService } from './../../../services/msg.service.js'
import { noteService } from '../services/note.service.js'
import noteList from './../cmps/note-list.cmp.js'
import noteAdd from './../cmps/note-add.cmp.js'
import noteFilter from './../cmps/note-filter.cmp.js'

export default {
    name: 'note-app',
    components: {
        noteList,
        noteAdd,
        noteFilter
    },
    template: `
        <section class="note-app">
            <note-filter />
            <div class="main-keep-container">
                <note-add :noteTypes="noteTypes" @noteSaved="addNote" />
                <note-list :pinnedNotes="getPinnedNotes" :otherNotes="getOtherNotes"
                    @notePinned="pinNote"
                    @noteColored="colorNote"
                    @noteShare="shareNote"
                    @noteEdit="editNote"
                    @noteUpdateEdit="submitEdit"
                    @noteDuplicate="duplicateNote"
                    @noteRemove="removeNote"
                    @toggleTodo="todoToggle"
                    />
            </div> 
        </section>
    `,
    data() {
        return {
            notes: [],
            noteTypes: {
                text: {
                    icon: 'far fa-edit',
                    placeholder: 'What\'s on your mind...',
                    title: 'Text',
                    cmp: 'note-text'
                },
                todos: {
                    icon: 'fas fa-list-ul',
                    placeholder: 'Enter todos, comma separated...',
                    title: 'Todos',
                    cmp: 'note-todos'
                },
                img: {
                    icon: 'far fa-image',
                    placeholder: 'Enter an image URL...',
                    title: 'Image',
                    cmp: 'note-img'
                },
                vid: {
                    icon: 'fab fa-youtube',
                    placeholder: 'Enter a youtube URL...',
                    title: 'Video',
                    cmp: 'note-vid'
                }
            },
            filterBy: null
        }
    },
    created() {
        this.loadNotes()
        console.log(this.$route.params);
    },
    methods: {
        loadNotes() {
            noteService.query()
                .then(notes => {
                    this.notes = notes
                })
        },
        addNote(noteTemplate, noteData) {
            noteService.addNote(noteTemplate, noteData)
                .then(note => {
                    this.notes = [note, ...this.notes]
                })
                .then(msgService.sendMsg('success', 'Note was successfully added.'))
                .catch(() => msgService.sendMsg('error', 'Something went wrong, please try again.'))
        },
        pinNote(noteId) {
            const idx = this.notes.findIndex(note => note.id === noteId)
            this.notes[idx].isPinned = !this.notes[idx].isPinned
            noteService.pinNote(noteId)
                .then(this.loadNotes)
        },
        colorNote(noteId, color) {
            const idx = this.notes.findIndex(note => note.id === noteId)
            this.notes[idx].style.backgroundColor = color
            noteService.colorNote(noteId, color)
        },
        shareNote(noteId) {
            const idx = this.notes.findIndex(note => note.id === noteId)
            const url = noteService.prepareParams(this.notes[idx])
            this.$router.push(url)
        },
        editNote(noteId) {
            const idx = this.notes.findIndex(note => note.id === noteId)
            this.notes[idx].isEditing = !this.notes[idx].isEditing
        },
        submitEdit(noteEdit) {
            noteService.editNote(noteEdit)
                .then(this.loadNotes)
        },
        duplicateNote(noteId) {
            const idx = this.notes.findIndex(note => note.id === noteId)
            noteService.dupNote(this.notes[idx])
                .then(this.loadNotes)
        },
        removeNote(noteId) {
            noteService.removeNote(noteId)
                .then(this.loadNotes)
        },
        todoToggle(todo, note) {
            const idx = this.notes.findIndex(updatedNote => updatedNote.id === note.id)
            this.notes[idx].isDone = !this.notes[idx].isDone
            noteService.toggleTodo(todo, note)
                .then(this.loadNotes)
        }
    },
    computed: {
        getPinnedNotes() {
            return this.notes.filter(note => note.isPinned)
        },
        getOtherNotes() {
            return this.notes.filter(note => !note.isPinned)
        }
    }
}