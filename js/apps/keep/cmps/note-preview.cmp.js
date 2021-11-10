import noteTxt from './input-type/txt.cmp.js'
import noteTodos from './input-type/todos.cmp.js'
import noteImg from './input-type/img.cmp.js'
import noteVid from './input-type/video.cmp.js'

export default {
    name: 'note-preview',
    props: ['note'],
    components: {
        noteTxt,
        noteTodos,
        noteImg,
        noteVid
    },
    template: `
        <component class="note-preview" 
                :is="note.type"
                :info="note.info">
        </component>
    `
}