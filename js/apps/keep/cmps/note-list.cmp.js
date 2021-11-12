import { noteService } from './../services/note.service.js'
import notePreview from './note-preview.cmp.js'
import noteEdit from './note-edit.cmp.js'
import noteActions from './note-actions.cmp.js'

export default {
    name: 'note-list',
    props: ['pinnedNotes','otherNotes'],
    components: {
        notePreview,
        noteEdit,
        noteActions
    },
    template: `
    <section class="notes-list">
        <div class="pinned-notes masonry">
            <h3>Pinned Notes</h3>
            <div v-for="(note, idx) in pinnedNotes" class="note-card" :style="note.style">
                <note-preview :note="note" />
                <note-edit :note="note" v-if="note.isEditing" @noteSaved="noteSubmitEdit" />
                <note-actions :note="note"
                    @notePinned="notePin"
                    @noteColored="noteColor"
                    @noteShare="noteShare"
                    @noteEdit="noteEdit"
                    @noteDuplicate="noteDuplicate"
                    @noteRemove="noteRemove" 
                    />
            </div>
        </div>
        <div class="other-notes masonry">
            <h3>Notes</h3>
            <div v-for="(note, idx) in otherNotes" class="note-card" :style="note.style">
                <note-preview :note="note" />
                <note-edit :note="note" v-if="note.isEditing" @noteSaved="noteSubmitEdit" />
                <note-actions :note="note" 
                    @notePinned="notePin"
                    @noteColored="noteColor"
                    @noteShare="noteShare"
                    @noteEdit="noteEdit"
                    @noteDuplicate="noteDuplicate"
                    @noteRemove="noteRemove" 
                    />
            </div>
        </div>
    </section>
    `,
    methods: {
        notePin(noteId) {
            this.$emit('notePinned', noteId)
        },
        noteColor(noteId, color) {
            this.$emit('noteColored', noteId, color)    
        },
        noteShare(noteId) {
            this.$emit('noteShare', noteId)
        },
        noteEdit(noteId) {
            this.$emit('noteEdit', noteId)
        },
        noteSubmitEdit(newNote) {
            this.$emit('noteUpdateEdit', newNote)
        },
        noteDuplicate(noteId) {
            this.$emit('noteDuplicate', noteId)
        },
        noteRemove(noteId) {
            this.$emit('noteRemove', noteId)
        }
    },
}