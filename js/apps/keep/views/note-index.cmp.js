import { eventBus } from '../../../services/event-bus.service.js'
import { msgService } from './../../../services/msg.service.js'
import { noteService } from '../services/note.service.js'
import noteList from './../cmps/note-list.cmp.js'
import noteAdd from './../cmps/note-add.cmp.js'

export default {
    name: 'note-app',
    components: {
        noteList,
        noteAdd
    },
    template: `
        <section class="note-app">
            <aside class="aside-dummy">
                <div class="side">aside</div>
                <div class="side">ads</div>
                <div class="side">asd</div>
                <div class="side">asd</div>
            </aside>
            <div class="main-keep-container">
                <note-add @noteSaved="addNote" />
                <note-list @listChanged="loadNotes" :notes="notes" />
            </div>
        </section>
    `,
    data() {
        return {
            notes: null
        }
    },
    created() {
        this.loadNotes()
    },
    methods: {
        loadNotes() {
            noteService.query()
                .then(notes => this.notes = notes)
        },
        addNote(newNote) {
            noteService.addNote(newNote)
                .then(note => this.notes.push(note))
                .then(msgService.sendMsg('success', 'Note was successfully added.'))
                .catch(() => msgService.sendMsg('error', 'Something went wrong, please try again.'))
        },
    },
}