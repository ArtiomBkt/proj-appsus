import { noteService } from './../services/note.service.js'
import { msgService } from './../../../services/msg.service.js'
import { eventBus } from './../../../services/event-bus.service.js'

export default {
    props: ['note'],
    template: `
        <span class="actions">
            <span @click="notePin"><i class="fas fa-map-pin"></i></span>
            <span @click="noteShare"><i class="fas fa-share-alt"></i></span>
            <span @click="noteEdit"><i class="fas fa-edit"></i></span>
            <span @click="noteDuplicate"><i class="fas fa-clone"></i></span>
            <span @click="noteRemove"><i class="fas fa-trash-alt"></i></span>
            <span @click="toggleColorsMenu"><i class="fas fa-brush"></i></span>
            <span class="color-picker" v-if="colorChangeOn">
                <template v-for="color in bgcolors">
                    <span :style="{'background-color': color.value}" 
                        :class="[setColorClass(color.name), color.name]" class="color-blob"
                        @click="colorChange(color.value)">
                    </span>
                </template>
            </span>
        </span>
    `,
    data() {
        return {
            bgcolors: [
                { value: '#faf0e6', name: 'linen' },
                { value: '#ff8888', name: 'red' },
                { value: '#ffcc88', name: 'orange' },
                { value: '#ffff88', name: 'yellow' },
                { value: '#ccff99', name: 'green' },
                { value: '#aaffee', name: 'turquoise' }
            ],
            colorChangeOn: false
        }
    },
    methods: {
        notePin() {
            noteService.pinNote(this.note)
            eventBus.$emit('listChanged')
        },
        toggleColorsMenu() {
            this.colorChangeOn = !this.colorChangeOn
        },
        colorChange(color) {
            this.note.style.backgroundColor = color
            this.colorChangeOn = false
            eventBus.$emit('listChanged')
        },
        noteShare(noteId) {
            console.log('share' , noteId)
        },
        noteEdit(note) {
            if (note.isEditing) {
                note.isEditing = false
                return noteService.editNote(note)
            }
            else note.isEditing = !note.isEditing
        },
        noteDuplicate(noteId) {
            console.log('duplicate',noteId)
        },
        noteRemove() {
            noteService.removeNote(this.note.id)
                .then(eventBus.$emit('listChanged'))
                .then(msgService.sendMsg('success', 'Note removed successfully.'))
        },
        setColorClass(color) {
            return (this.note.style.backgroundColor === color) ? 'selected' : ''
        }
    }
}