import noteTxt from "./input-type/txt.cmp.js"

export default {
    name: 'note-preview',
    props: ['note'],
    components: {
        noteTxt
    },
    template: `
        <component class="note-preview" 
                :is="note.type"
                :info="note.info">

        </component>
    `,
}