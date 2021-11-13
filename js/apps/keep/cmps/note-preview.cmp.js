import noteText from './input-type/txt.cmp.js'
import noteTodos from './input-type/todos.cmp.js'
import noteImg from './input-type/img.cmp.js'
import noteVid from './input-type/video.cmp.js'

export default {
    name: 'note-preview',
    props: ['note'],
    components: {
        noteText,
        noteTodos,
        noteImg,
        noteVid
    },
    template: `
        <component class="note-preview" 
                :is="note.cmp"
                :info="note.info"
                @toggleTodo="doneTodo">
        </component>
    `,
    methods: {
        doneTodo(todo) {
            this.$emit('toggleTodo', todo, this.note)
        }
    }
}