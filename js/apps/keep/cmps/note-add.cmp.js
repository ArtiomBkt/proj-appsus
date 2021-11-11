import { msgService } from './../../../services/msg.service.js'

export default {
    name: 'note-add',
    template: `
        <section class="note-add">
            <form @submit.prevent="validateForm" novalidate="true">
                <div class="input-row">
                    <input v-if="note.type !== 'note-txt'" type="text" v-model="note.title" placeholder="Title" />
                    <input type="text" v-model="note.txt" placeholder="What's on your mind.." />
                    <span @click.stop.prevent="setType" data-type="note-txt" title="Text input"><i class="far fa-edit"></i></span>
                    <span @click.stop.prevent="setType" data-type="note-todos" title="Todos input"><i class="fas fa-list-ul"></i></span>
                    <span @click.stop.prevent="setType" data-type="note-img" title="Img input"><i class="far fa-image"></i></span>
                    <span @click.stop.prevent="setType" data-type="note-vid" title="Video input"><i class="fab fa-youtube"></i></span>
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
            msgService.sendMsg('success', 'Note was successfully added.')
            this.note.title = ''
            this.note.txt = ''
        }
    },
}