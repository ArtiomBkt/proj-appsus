export default {
    name: 'todo-preview',
    props: ['todo'],
    template: `
        <span :class="strikeTodo" @click="toggleTodo">
            {{ todo.txt }} <span v-if="isDone">- {{ todo.doneAt }}</span>
        </span>
    `,
    data() {
        return {
            isDone: false
        }
    },
    methods: {
        toggleTodo(){
            this.isDone = !this.isDone
            this.todo.doneAt = this.todo.doneAt ? null : new Date().toLocaleTimeString()
        }
    },
    computed: {
        strikeTodo() {
            return this.isDone ? 'strike' : ''
        }
    }
}