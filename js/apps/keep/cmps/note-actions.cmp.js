import { eventBus } from './../../../services/event-bus.service.js'

export default {
    props: ['note'],
    template: `
        <span class="actions">
            <span @click="notePin"><i class="fas fa-map-pin"></i></span>
            <span @click="noteShare"><i class="fas fa-paper-plane"></i></span>
            <span @click="noteEdit"><i class="fas fa-edit"></i></span>
            <span @click="noteDuplicate"><i class="fas fa-clone"></i></span>
            <span @click="noteRemove"><i class="fas fa-trash-alt"></i></span>
            <span @click="toggleColorsMenu"><i class="fas fa-brush"></i></span>
            <span class="color-picker" v-show="colorChangeOn">
                <template v-for="color in bgcolors">
                    <span :style="{'background-color': color.value}" 
                        :class="[setColorClass(color.value), color.name]" class="color-blob"
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
            this.$emit('notePinned', this.note.id)
        },
        colorChange(color) {
            this.$emit('noteColored', this.note.id, color)
        },
        noteShare() {
            this.$emit('noteShare', this.note.id)
        },
        noteEdit() {
            this.$emit('noteEdit', this.note.id)
        },
        noteDuplicate() {
            this.$emit('noteDuplicate', this.note.id)
        },
        noteRemove() {
            this.$emit('noteRemove', this.note.id)
        },
        toggleColorsMenu() {
            this.colorChangeOn = !this.colorChangeOn
        },
        setColorClass(color) {
            return (this.note.style.backgroundColor === color) ? 'selected' : ''
        }
    }
} 