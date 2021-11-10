export default {
    name: 'todo-preview',
    props: ['todo'],
    template: `
        <span :class="strikeTodo">
            {{ todo.txt }} <span v-if="isDone">-</span> {{ todo.doneAt }}
        </span>
    `,
    data() {
        return {
            isDone: false
        }
    },
    computed: {
        strikeTodo() {
            if (this.todo.doneAt !== null) {
                this.isDone = true
                return 'strike'
            } else return ''
        }
    }
}