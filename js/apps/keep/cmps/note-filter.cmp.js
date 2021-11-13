export default {
    name: 'note-filter',
    props: ['notes'],
    template: `
        <aside class="aside">
            <template v-for="type of noteTypes">
                <div :class="{'selected-filter':filterBy.type === type.filter}" class="type-folder" :title="type.filter" @click="showTypeOf(type.filter)">
                    <i :class="type.icon"></i>
                </div>
            </template>
        </aside>
    `,
    data() {
        return {
            noteTypes: {
                'all':{filter:'all', icon:'fas fa-border-all'}, 
                'text':{filter:'text' ,icon:'far fa-edit'},
                'todos':{filter:'todos' ,icon:'fas fa-list-ul'},
                'img':{filter:'img' ,icon:'far fa-image'},
                'vid':{filter:'vid' ,icon:'fab fa-youtube'}
            },
            filterBy: {
                type: 'all'
            }
        }
    },
    methods: {
        showTypeOf(type) {
            this.filterBy.type = type
            this.$emit('filterBy', { ...this.filterBy })
        }
    }
}