export default {
  props: ['book'],
  template: `
    <router-link :to='/book/+this.book.id' class="book-preview">
        <figure class="gallery-item">
            <span class="gallery-book-title">{{book.title}}</span>
            <img :src="thumbnailForDisplay" />
        </figure>
      
    </router-link>
    `,
  computed: {
    currencyForDisplay() {
      switch (this.book.listPrice.currencyCode) {
        case 'ILS':
          return '₪'
        case 'USD':
          return '$'
        case 'EUR':
          return '€'
      }
    },
    thumbnailForDisplay() {
      return this.book.thumbnail
    },
  },
}
