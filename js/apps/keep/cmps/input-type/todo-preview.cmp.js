export default {
    name: 'todo-preview',
    props: ['todo'],
    template: `
        <span :class="strikeTodo" @click="toggleTodo">
            {{ todo.txt }} <span v-if="todo.isDone">- {{ todo.doneAt }}</span>
        </span>
    `,
    methods: {
        toggleTodo(){
            this.todo.isDone = !this.todo.isDone
            this.$emit('doTodo', this.todo)
        }
    },
    computed: {
        strikeTodo() {
            return this.todo.isDone ? 'strike' : ''
        }
    }
}