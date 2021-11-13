export default {
  template: `
      <div class="book-filter">
        <form @submit.prevent>
          <input v-model.trim="filterBy.byName" type="text" class="search-bar" placeholder="Search" />
          <input v-model.number="filterBy.fromPrice" type="number" placeholder="From Price" >
          <input v-model.number="filterBy.toPrice" type="number" placeholder="To Price">
          <button @click="filter" type="submit">Search</button>
        </form>
      </div>
      `,
  data() {
    return {
      filterBy: {
        byName: '',
        fromPrice: 0,
        toPrice: Infinity,
      },
    }
  },
  methods: {
    filter() {
      this.$emit('filtered', { ...this.filterBy })
    },
  },
}
