import { bookService } from '../services/book.service.js'
// import longText from '../cmps/long-text.cmp.js'
// import reviewAdd from '../cmps/review-add.cmp.js'
// import reviewList from '../cmps/review-list.cmp.js'
// import { eventBus } from '../services/event-bus-service.js'

export default {
  components: {
    // longText,
    // reviewAdd,
    // reviewList,
    // eventBus,
  },
  template: `
  <section v-if="book" class="book-details">
    <template>
        <router-link :to="'/book/'+prevBookId">Prev</router-link>
        <router-link :to="'/book/'+nextBookId">Next</router-link>
    </template>
    <div class="book-info">
    <p>{{book.title}}</p>
    <img :src="thumbnailForDisplay" />
    <p>Categories: {{catagoriesForDisplay}}</p>
    <p>Authors: {{authorsForDisplay}}</p>
    <p>PublishedDate: {{book.publishedDate}}</p>
    <p>PageCount: {{book.pageCount}}</p>
    <p>Language: {{book.language}}</p>
    <p>Price: <span v-bind:class="colorPrice">{{priceForDisplay}}</span></p>
    <p>{{onSaleDisplay}}</p>
  </div>
  <!-- <long-text v-bind:txt="book.description" />  -->
  <!-- <section class="reviews-section"> -->
    <!-- <review-add @review-added="addReview" /> -->
    <!-- <review-list @review-removed="removeReview" :reviews="reviews"/> -->
  <!-- </section> -->
  </section>
  `,
  data() {
    return {
      book: null,
      reviews: null,
      nextBookId: null,
      prevBookId: null,
    }
  },

  methods: {
    removeReview(reviewId) {
      const bookId = this.book.id
      const idx = this.reviews.findIndex((review) => review.id === reviewId)
      this.reviews.splice(idx, 1)
      bookService
        .removeReview(reviewId, bookId)
        .then((book) => {
          const msg = {
            txt: `Review for book ${book.title} Was deleted`,
            type: 'success',
            link: `/book/${book.id}`,
          }
          eventBus.$emit('showMsg', msg)
        })
        .catch((err) => {
          const msg = getErrorMsg()
          eventBus.$emit('showMsg', msg)
        })
    },
    addReview(review) {
      let book = { ...this.book }
      book.reviews.push(review)
      bookService
        .save(book)
        .then((book) => {
          const msg = {
            txt: `Review for book ${book.title} Was added`,
            type: 'success',
            link: `/book/${book.id}`,
          }
          eventBus.$emit('showMsg', msg)
        })
        .catch((err) => {
          const msg = getErrorMsg()
          eventBus.$emit('showMsg', msg)
        })
    },
    getErrorMsg() {
      return {
        txt: 'Error. Please try later',
        type: 'error',
      }
    },
  },
  watch: {
    '$route.params.bookId': {
      handler() {
        const { bookId } = this.$route.params
        bookService.getBookById(bookId).then((book) => {
          let reviews = book.reviews || []
          this.book = book
          this.reviews = reviews
        })
        bookService
          .getNextBookId(bookId)
          .then((bookId) => (this.nextBookId = bookId))
        bookService
          .getPrevBookId(bookId)
          .then((bookId) => (this.prevBookId = bookId))
      },
      immediate: true,
    },
  },
  computed: {
    pageLength() {
      const pageNumber = this.book.pageCount
      if (pageNumber > 500) return 'Long reading'
      if (pageNumber > 200) return 'Decent Reading'
      if (pageNumber < 100) return 'Light Reading'
    },
    bookAge() {
      var tenYearsAgoFromNow = new Date()
      tenYearsAgoFromNow.setFullYear(tenYearsAgoFromNow.getFullYear() - 10)
      tenYearsAgoFromNow = +tenYearsAgoFromNow.toISOString().slice(0, 4)
      if (this.book.publishedDate < tenYearsAgoFromNow) return 'Veteran Book'
      else return 'New!'
    },
    colorPrice() {
      return this.book.listPrice.amount > 150 ? 'red' : 'green'
    },
    authorsForDisplay() {
      return this.book.authors.join(' , ')
    },
    catagoriesForDisplay() {
      return this.book.categories.join(' , ')
    },
    thumbnailForDisplay() {
      return this.book.thumbnail
    },
    priceForDisplay() {
      const currency = this.book.listPrice.currencyCode
      const price = this.book.listPrice.amount
      if (currency === 'ILS') return price + '₪'
      if (currency === 'USD') return price + '$'
      if (currency === 'EUR') return price + '€'
    },
    onSaleDisplay() {
      const isOnSale = this.book.listPrice.isOnSale
      if (isOnSale) return 'BOOK IS ON SALE'
    },
  },
}
