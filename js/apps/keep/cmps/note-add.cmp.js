import { noteService } from "../services/note.service.js"

export default {
    name: 'note-add',
    template: `
        <section class="note-add">
            <form @submit.prevent>
                <div class="input-row">
                    <input v-if="note.type !== 'note-txt'" type="text" v-model="note.title" placeholder="Title" />
                    <input type="text" v-model="note.txt" placeholder="What's on your mind.." />
                    <span @click="setType" data-type="note-txt">text</span>
                    <span @click="setType" data-type="note-todos">todo</span>
                    <span @click="setType" data-type="note-img">img</span>
                    <span @click="setType" data-type="note-vid">vid</span>
                </div>
                <button @click.stop="saveNote">Add</button>
            </form>
        </section>
    `,
    data() {
        return {
            note: {
                title: '',
                txt: '',
                type: 'note-txt'
            }
        }
    },
    methods: {
        setType(ev) {
            this.note.type = ev.target.dataset.type
        },
        saveNote() {
            noteService.addNote(this.note)
            this.note.title = ''
            this.note.txt = ''
        }
    }
}