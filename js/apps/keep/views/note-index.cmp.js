import { eventBus } from './../../../services/event-bus.service.js'
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
        <section class="note-app app-main">
            <note-add />
            <note-list :notes="notes" />
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
        }
    },
}