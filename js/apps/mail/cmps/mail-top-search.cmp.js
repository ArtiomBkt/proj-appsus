export default {
  name: 'mail-top-search',
  template: `
      <div class="mail-top-search">
        <form @submit.prevent >
          <button type="submit" class="search-btn"><i class="fas fa-search"></i></button>
            <input v-model="searchBy.byTitle" @input="search" type="text" class="search-bar" placeholder="Search mail - By Title" />
        </form>
      </div>
      `,
  data() {
    return {
      searchBy: {
        byTitle: '',
      },
    }
  },
  methods: {
    search() {
      this.$emit('searched', { ...this.searchBy })
    },
  },
}
