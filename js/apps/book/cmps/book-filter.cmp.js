export default {
  template: `
      <div class="book-filter">
        <form @submit.prevent>
          <input v-model.trim="filterBy.byName" type="text" class="search-bar" placeholder="Search - By Book Name" />
          <div class="price-filter-container">
            <input v-model.number="filterBy.fromPrice" type="number" class="price-from" placeholder="From Price" >
            <input v-model.number="filterBy.toPrice" type="number" class="price-to" placeholder="To Price">
            <button class="book-filter-btn" @click="filter" type="submit">Search</button>
          </div>
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
