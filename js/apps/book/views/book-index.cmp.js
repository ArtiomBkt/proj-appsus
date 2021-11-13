import { bookService } from '../services/book.service.js'
import bookList from '../cmps/book-list.cmp.js'
import bookFilter from '../cmps/book-filter.cmp.js'

export default {
  components: {
    bookList,
    bookFilter,
  },
  name: 'book-app',
  template: `
         <section class="book-app">
        <!-- <book-add @book-added="add"></book-add> -->
        <book-filter @filtered="setFilter" />
        <book-list v-if="!selectedBook" :books="booksToShow" />
        </section>
    `,
  data() {
    return {
      books: [],
      filterBy: null,
      selectedBook: null,
    }
  },

  created() {
    this.loadBooks()
  },
  methods: {
    loadBooks() {
      bookService.query().then((books) => (this.books = books))
    },
    setFilter(filterBy) {
      this.filterBy = filterBy
    },
  },
  computed: {
    booksToShow() {
      if (!this.filterBy) return this.books
      const { byName, fromPrice, toPrice } = this.filterBy
      const searchStr = byName.toLowerCase()
      const booksToShow = this.books.filter((book) => {
        return (
          (book.title.toLowerCase().includes(searchStr) &&
            book.listPrice.amount > fromPrice &&
            book.listPrice.amount < toPrice) ||
          !toPrice
        )
      })
      return booksToShow
    },
  },
}
