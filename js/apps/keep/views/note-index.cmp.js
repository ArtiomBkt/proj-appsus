import { eventBus } from '../../../services/event-bus.service.js'
import { msgService } from './../../../services/msg.service.js'
import { noteService } from '../services/note.service.js'
import noteList from './../cmps/note-list.cmp.js'
import noteAdd from './../cmps/note-add.cmp.js'
import noteFilter from './../cmps/note-filter.cmp.js'
import txtCmp from '../cmps/input-type/txt.cmp.js'

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
                <note-add @noteSaved="addNote" />
                <note-list :pinnedNotes="getPinnedNotes" :otherNotes="getOtherNotes"
                    @notePinned="pinNote"
                    @noteColored="colorNote"
                    @noteShare="shareNote"
                    @noteEdit="editNote"
                    @noteUpdateEdit="submitEdit"
                    @noteDuplicate="duplicateNote"
                    @noteRemove="removeNote" 
                    />
            </div> 
        </section>
    `,
    data() {
        return {
            notes: [],
        }
    },
    created() {
        this.loadNotes()
        // eventBus.$on('listChanged', this.loadNotes)
    },
    methods: {
        loadNotes() {
            noteService.query()
                .then(notes => {
                    this.notes = notes
                })
        },
        addNote(newNote) {
            noteService.addNote(newNote)
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
            this.notes[idx]
        },
        editNote(noteId) {
            const idx = this.notes.findIndex(note => note.id === noteId)
            this.notes[idx].isEditing = !this.notes[idx].isEditing
            // return noteService.editNote(this.notes[idx])
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