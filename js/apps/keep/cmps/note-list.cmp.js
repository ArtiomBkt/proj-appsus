import { noteService } from './../services/note.service.js'
import notePreview from './note-preview.cmp.js'
import noteEdit from './note-edit.cmp.js'

export default {
    name: 'note-list',
    props: ['notes'],
    components: {
        notePreview,
        noteEdit
    },
    template: `
    <section class="notes-list">
        <div v-for="note in notes" :key="note.id" class="note-card">
            <note-preview :note="note" @click.native="previewNote" />
            <note-edit :note="note" v-if="note.isEditing" @noteSaved="noteEdit" />
            <div class="note-actions">
                <span @click.prevent="notePin(note.id)">pin</span>
                <span @click.prevent="noteColorChange(note.id)">color</span>
                <span @click.prevent="noteShare(note.id)">share</span>
                <span @click.prevent="noteEdit(note)">edit</span>
                <span @click.prevent="noteDuplicate(note.id)">duplicate</span>
                <span @click.prevent="noteRemove(note.id)">remove</span>
            </div>
        </div>
    </section>
    `,
    data() {
        return {
            // note
        }
    },
    methods: {
        notePin(noteId) {
            noteService.pinNote(noteId)
        },
        noteColorChange(noteId) {
            console.log('color' ,noteId)
        },
        noteShare(noteId) {
            console.log('share' , noteId)
        },
        noteEdit(note) {
            if (note.isEditing) {
                note.isEditing = false
                return noteService.editNote(note)
            }
            note.isEditing = !note.isEditing
        },
        noteDuplicate(noteId) {
            console.log('duplicate',noteId)
        },
        noteRemove(noteId) {
            noteService.removeNote(noteId)
                .then(() => this.$emit('listChanged'))
                .then(msgService.sendMsg('success', 'Note removed successfully.'))
                .then(msgService.sendMsg('error', 'Something went wrong, please try again.'))
        },
        previewNote() {
            
        }
    },
}

// v-if="isNoteEditing"