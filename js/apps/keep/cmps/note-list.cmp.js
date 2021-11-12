import { noteService } from './../services/note.service.js'
import notePreview from './note-preview.cmp.js'
import noteEdit from './note-edit.cmp.js'
import noteActions from './note-actions.cmp.js'

export default {
    name: 'note-list',
    props: ['notes'],
    components: {
        notePreview,
        noteEdit,
        noteActions
    },
    template: `
    <section class="notes-list">
        <div v-if="pinnedNotes.length" class="pinned-notes masonry">
            <h3>Pinned Notes</h3>
            <div v-for="(note, idx) in pinnedNotes" class="note-card" :style="note.style">
                <note-preview :note="note" />
                <note-edit :note="note" v-if="note.isEditing" @noteSaved="noteEdit" />
                <note-actions :note="note" />
            </div>
        </div>
        <div v-if="otherNotes.length" class="other-notes masonry">
            <h3>Notes</h3>
            <div v-for="(note, idx) in otherNotes" class="note-card" :style="note.style">
                <note-preview :note="note" />
                <note-edit :note="note" v-if="note.isEditing" @noteSaved="noteEdit" />
                <note-actions :note="note" />
            </div>
        </div>
    </section>
    `,
    data() {
        return {
            pinnedNotes: null,
            otherNotes: null
        }
    },
    created() {
        this.getPinnedNotes()
        this.getNotes()
    },
    methods: {
        getPinnedNotes() {
            let filtered = this.notes.filter(note => note.isPinned)
            this.pinnedNotes = filtered
        },
        getNotes() {
            let filtered = this.notes.filter(note => !note.isPinned)
            this.otherNotes = filtered
        }
    },
}