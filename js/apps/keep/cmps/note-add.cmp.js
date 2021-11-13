import { noteService } from "../services/note.service.js"

export default {
    name: 'note-add',
    props: ['noteTypes'],
    template: `
        <section class="note-add">
            <form @submit.prevent="saveNote" novalidate="true">
                <div class="input-row">
                    <input type="text" v-if="inputFocus" class="note-title-inp" v-model="inputData.title" placeholder="Title" />
                    <input :type="setInputType" class="note-text-inp" :class="{ 'input-focus': inputFocus }" @click="onInputFocus" v-model="inputData.txt" 
                        :placeholder="setPlaceHolder" />
                    <template v-for="(noteType, idx) in noteTypes">
                        <span @click="setNoteType(idx)" v-if="inputFocus" :class="selected(idx)" :title="noteType.title">
                            <i :class="noteType.icon"></i>
                        </span>
                    </template>
                </div>
                <input v-show="false" type="submit" value="Submit" />
            </form>
        </section>
    `,
    data() {
        return {
            note: '',
            inputData: {
                title: null,
                txt: null
            },
            inputFocus: false
        }
    },
    created() {
        this.note = noteService.getTemplateNote()
        this.inputData.title = this.$route.query.title
        this.inputData.txt = this.$route.query.body
        // if (this.inputData.title && this.inputData.txt) {
        //     this.saveNote()
        // }
    },
    methods: {
        onInputFocus() {
            this.inputFocus = true
        },
        setNoteType(noteType) {
            this.inputFocus = true
            this.note.type = noteType
            this.note.cmp = this.noteTypes[noteType].cmp
        },
        selected(noteType) {
            return (this.note.type === noteType) ? 'type-selected' : ''
        },
        saveNote() {
            this.$emit('noteSaved', this.note, {...this.inputData})
            this.note = noteService.getTemplateNote()
            this.inputData.title = ''
            this.inputData.txt = ''
            if (this.$route.query.txt) this.$router.push('/keep')
        }
    },
    computed: {
        setInputType() {
            if (this.note.type === 'text' || this.note.type === 'todos') return 'text'
            else return 'url'
        },
        setPlaceHolder() {
            return this.noteTypes[this.note.type].placeholder
        }
    }
}