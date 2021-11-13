import bookPreview from './book-preview.cmp.js'

export default {
  components: {
    bookPreview,
  },
  props: ['books'],
  template: `
  <div class="books-gallery">
      <ul class="clean-list book-list">
          <li v-for="book in books" :key="book.id" class="book-preview-container">
              <book-preview :book="book"/>
          </li>
      </ul>
      </div>
      `,
  methods: {},
}
