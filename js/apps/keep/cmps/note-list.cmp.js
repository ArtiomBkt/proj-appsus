import notePreview from './note-preview.cmp.js'

export default {
    name: 'note-list',
    props: ['notes'],
    components: {
        notePreview
    },
    template: `
    <section class="notes-list">
        <div v-for="note in notes" :key="note.id" class="note-card">
            <note-preview :note="note" @click.native="previewNote" />
            <div class="note-actions">
                <span @click.prevent="notePin(note.id)">pin</span>
                <span @click.prevent="noteColorChange(note.id)">color</span>
                <span @click.prevent="noteShare(note.id)">share</span>
                <span @click.prevent="noteEdit(note.id)">edit</span>
                <span @click.prevent="noteDuplicate(note.id)">duplicate</span>
                <span @click.prevent="noteRemove(note.id)">remove</span>
            </div>
        </div>
    </section>
    `,
    methods: {
        notePin(noteId) {
            console.log('pin', noteId)
        },
        noteColorChange(noteId) {
            console.log('color' ,noteId)
        },
        noteShare(noteId) {
            console.log('share' , noteId)
        },
        noteEdit(noteId) {
            console.log('edit' ,noteId)
        },
        noteDuplicate(noteId) {
            console.log('duplicate',noteId)
        },
        noteRemove(noteId) {
            console.log('remove' ,noteId)
        },
        previewNote() {
            
        }
    },
}