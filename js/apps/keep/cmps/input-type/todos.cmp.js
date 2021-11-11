import todoPreview from './todo-preview.cmp.js'

export default {
    name: 'note-todos',
    props: ['info'],
    components: {
        todoPreview
    },
    template: `
        <div>
            <h2 class="note-title">{{ info.label }}</h2>
            <ul class="todos-container">
                <li v-for="(todo,idx) in info.todos" :key="idx" class="todo-item">
                    <todo-preview :todo="todo" />
                </li>
            </ul>
        </div>
    `
}