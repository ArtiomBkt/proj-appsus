export default {
    name: 'note-edit',
    props: ['note'],
    template: `
        <section class="note-edit">
            <form @submit.prevent="editNote" novalidate="true">
                <div class="input-row">
                    <input type="text" v-model="newInfo.title" placeholder="Title" />
                    <input type="text" v-model="newInfo.txt" placeholder="What's on your mind.." />
                </div>
                <input type="submit" value="Submit edit" />
            </form>
        </section>
    `,
    data() {
        return {
            newInfo: {
                id: '',
                title: '',
                txt: '',
                type: null
            }
        }
    },
    created() {
        this.newInfo = this.getNoteInfo()
    },
    methods: {
        getNoteInfo() {
            let title = ''
            let txt = ''
            let type = this.note.type
            let id = this.note.id
            if (this.note.type === 'note-txt') {
                title = this.note.info.title
                txt = this.note.info.txt
            } 
            else if (this.note.type === 'note-todos') {
                title = this.note.info.title
                txt = this.note.info.todos.map(todo => todo.txt).join(', ')
            }
            else if (this.note.type === 'note-img' || this.note.type === 'note-vid') {
                title = this.note.info.title
                txt = this.note.info.url
            }
            return { title, txt, type, id }
        },
        editNote() {
            this.$emit('noteSaved', this.newInfo)
        }
    }
}