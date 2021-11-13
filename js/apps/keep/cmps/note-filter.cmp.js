export default {
    name: 'note-filter',
    props: ['notes'],
    template: `
        <aside class="aside">
            <template v-for="type in noteTypes">
                <div :class="type" class="type-folder" @click="showTypeOf(type)">
                    {{ type }}
                </div>
            </template>
        </aside>
    `,
    data() {
        return {
            noteTypes: ['all', 'text','todos','img','vid'],
            filterBy: {
                type: null
            }
        }
    },
    methods: {
        showTypeOf(type) {
            this.filterBy.type = type
            this.$emit('filterBy', { ...this.filterBy })
        }
    },
}