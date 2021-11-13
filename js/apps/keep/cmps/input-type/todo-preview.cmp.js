export default {
    name: 'todo-preview',
    props: ['todo'],
    template: `
        <span @click="toggleTodo">
            <span :class="strikeTodo">{{ todo.txt }}</span> <span v-if="todo.isDone">{{ todo.doneAt }}</span>
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