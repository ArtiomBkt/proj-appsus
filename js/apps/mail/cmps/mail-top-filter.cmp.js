export default {
  name: 'mail-top-filter',
  template: `
      <div class="mail-top-filter">
        <form @submit.prevent >
          <button type="submit" class="search-btn"><i class="fas fa-search"></i></button>
          <input v-model="filterBy.bySubject" @input="filter" type="text" class="search-bar" placeholder="Search mail" />
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
