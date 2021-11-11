import { msgService } from './../../../services/msg.service.js'

export default {
    name: 'note-add',
    template: `
        <section class="note-add">
            <form @submit.prevent="validateForm" novalidate="true">
                <div class="input-row">
                    <!-- <input type="text" v-model="note.title" placeholder="Title" /> -->
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
                title: 's',
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
            console.log(this.note);
            if (!this.note.txt || !this.note.title) return msgService.sendMsg('error', 'Invalid inputs.')
            console.log(this.note.type);
            if (this.note.type !== 'note-txt' && this.note.type !== 'note-todos') {
                let ytId = this.note.txt.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
                if (ytId) {
                    this.note.txt = ytId
                    this.note.type = 'note-vid'
                }
                else if (this.note.txt.match(/\.(jpeg|jpg|gif|png)$/)) this.note.type = 'note-img'
                else console.log('error');
                console.log(this.note.type);
            }
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



