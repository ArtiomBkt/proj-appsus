export default {
  name: 'mail-top-filter',
  template: `
      <div class="mail-top-filter">
        <form @submit.prevent>
          <input v-model="filterBy.bySubject" @input="filter" type="text" class="search-bar" placeholder="Search mail" />
          <button type="submit">Search</button>
        </form>
      </div>
      `,
  data() {
    return {
      filterBy: {
        bySubject: '',
      },
    }
  },
  methods: {
    filter() {
      this.$emit('filtered', { ...this.filterBy })
    },
  },
}
