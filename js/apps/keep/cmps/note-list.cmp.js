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
        <div v-for="note in notes" :key="note.id" class="note-card">
            <note-preview :note="note" @click.native="previewNote" />
            <note-edit :note="note" v-if="note.isEditing" @noteSaved="noteEdit" />
            <div class="note-actions">
                <note-actions :note="note" />
            </div>
        </div>
    </section>
    `,
    methods: {
        previewNote() {
            
        }
    },
}

// v-if="isNoteEditing"