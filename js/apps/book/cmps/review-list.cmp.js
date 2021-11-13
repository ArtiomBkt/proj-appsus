import reviewPreview from './review-preview.cmp.js'

export default {
  components: {
    reviewPreview,
  },
  props: ['reviews'],
  template: `
      <ul class="reviews-list clean-list">
          <li v-for="review in reviews" class="book-review-container" :key="review.id">
              <review-preview :review="review" @review-removed="removeReview"/>
          </li>
      </ul>
      `,

  methods: {
    removeReview(reviewId) {
      this.$emit('review-removed', reviewId)
    },
  },
}
