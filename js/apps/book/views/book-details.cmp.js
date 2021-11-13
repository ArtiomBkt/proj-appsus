import { bookService } from '../services/book.service.js'
import longText from '../../../cmps/long-txt.cmp.js'
import reviewAdd from '../cmps/review-add.cmp.js'
import reviewList from '../cmps/review-list.cmp.js'
// import { eventBus } from '../services/event-bus-service.js'

export default {
  components: {
    longText,
    reviewAdd,
    reviewList,
    // eventBus,
  },
  template: `
  <section v-if="book" class="book-details">

    <h1 class="capitalize book-title">{{book.title}}</h1>
    <div class="route-actions">
       <router-link :to="'/book/'+prevBookId"><i class="fas fa-arrow-left"></i></router-link>
       <router-link :to="'/book/'+nextBookId"><i class="fas fa-arrow-right"></i></router-link>
   </div>
    <h3 class="capitalize">{{book.subtitle}}</h3>
    <div class="book-item-block">

      <img :src="thumbnailForDisplay" />
      
      
      <div class="book-info capitalize">
      <div class="book-price">Price: <span v-bind:class="colorPrice">{{priceForDisplay}}</span></div>
      <p><span>Categories:</span> {{catagoriesForDisplay}}</p>
      <p><span>Authors:</span> {{authorsForDisplay}}</p>
      <p><span>PublishedDate:</span> {{book.publishedDate}}</p>
      <p><span>PageCount:</span> {{book.pageCount}}</p>
      <p><span>Language:</span> {{book.language}}</p>
      <p>{{onSaleDisplay}}</p>
    </div>
    <section class="add-reviews-container">
      <h2 >Add Review</h2>
    <review-add @review-added="addReview" />
  </section>
  <section class="reviews-container">
  <h3>Reviews</h3>
    <review-list @review-removed="removeReview" :reviews="reviews"/>
  </section>
  </div>
 
  <!-- <long-text v-bind:txt="book.description" />  -->
 
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
          // eventBus.$emit('showMsg', msg)
        })
        .catch((err) => {
          const msg = getErrorMsg()
          // eventBus.$emit('showMsg', msg)
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
          // eventBus.$emit('showMsg', msg)
        })
        .catch((err) => {
          const msg = getErrorMsg()
          // eventBus.$emit('showMsg', msg)
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
      return this.book.listPrice.amount > 150 ? 'highPrice' : 'lowPrice'
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
