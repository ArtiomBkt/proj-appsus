import { noteService } from './../services/note.service.js'
import { msgService } from './../../../services/msg.service.js'
import { eventBus } from './../../../services/event-bus.service.js'

export default {
    props: ['note'],
    template: `
        <span >
            <span @click="notePin" :class="{pinned: note.isPinned}"><i class="fas fa-map-pin"></i></span>
            <span @click="noteShare"><i class="fas fa-share-alt"></i></span>
            <span @click="noteEdit"><i class="fas fa-edit"></i></span>
            <span @click="noteDuplicate"><i class="fas fa-clone"></i></span>
            <span @click="noteRemove"><i class="fas fa-trash-alt"></i></span>
            <span @click="noteColorChange"><i class="fas fa-brush"></i></span>
            <span v-if="colorChange">
                <template v-for="color in bgcolors">
                    <span :style="{'background-color': color.value}" 
                        :class="setColorClass(color.value)"
                        @click="colorChange(color.value)">
                    </span>
                </template>
            </span>
        </span>
    `,
    data() {
        return {
            bgcolors: [
                { value: '#ffffff', name: 'white' },
                { value: '#ff8888', name: 'red' },
                { value: '#ffcc88', name: 'orange' },
                { value: '#ffff88', name: 'yellow' },
                { value: '#ccff99', name: 'green' },
                { value: '#aaffee', name: 'turquoise' }
            ],
            colorChange: false
        }
    },
    methods: {
        notePin(noteId) {
            noteService.pinNote(noteId)
        },
        noteColorChange(noteId) {
            console.log('color');
            this.colorChange = !this.colorChange
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
        noteRemove() {
            noteService.removeNote(this.note.id)
                .then(() => eventBus.$emit('listChanged'))
                .then(msgService.sendMsg('success', 'Note removed successfully.'))
        },
        setColorClass(color) {
            return (this.note.style.backgroundColor === color) ? 'selected' : ''
        }
    },
}