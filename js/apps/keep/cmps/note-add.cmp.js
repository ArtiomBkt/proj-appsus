import { msgService } from './../../../services/msg.service.js'

export default {
    name: 'note-add',
    template: `
        <section class="note-add">
            <form @submit.prevent="validateForm" novalidate="true">
                <div class="input-row">
                    <input type="text" v-model="note.title" placeholder="Title" />
                    <input type="text" v-model="note.txt" :placeholder="setPlaceHolder" />
                    <span @click.stop.prevent="setType" title="Text input"><i data-type="note-txt" class="far fa-edit"></i></span>
                    <span @click.stop.prevent="setType" title="Todos input"><i data-type="note-todos" class="fas fa-list-ul"></i></span>
                    <span @click.stop.prevent="setType" title="Img input"><i data-type="note-img" class="far fa-image"></i></span>
                    <span @click.stop.prevent="setType" title="Video input"><i data-type="note-vid" class="fab fa-youtube"></i></span>
                </div>
                <input type="submit" value="Submit" />
            </form>
        </section>
    `,
    data() {
        return {
            note: {
                title: '',
                txt: '',
                type: 'note-txt'
            },
            errors: []
        }
    },
    methods: {
        setType(ev) {
            this.note.type = ev.target.dataset.type
        },
        validateForm() {
            this.errors = []
            if (!this.note.txt) this.errors.push('Text is required.')
            if (this.note.type !== 'note-txt' && !this.note.title) this.errors.push('Title is required.')
            if (this.errors.length > 0) msgService.sendMsg('error', 'Invalid inputs.')
            else this.saveNote()
        },
        saveNote() {
            this.$emit('noteSaved', this.note)
            this.note.title = ''
            this.note.txt = ''
        }
    },
    computed: {
        setPlaceHolder() {
            if (this.note.type === 'note-txt') return 'What\'s on your mind...'
            if (this.note.type === 'note-todos') return 'Use commas to separate todos'
            else return 'Insert your desired URL'
        }
    }
}