export default {
  props: ['review'],
  template: `
    <section class="review-container">
      <span>Reader: {{review.bookreader}}</span>
      <span>
        <i class="checked fa fa-star"></i>{{review.rate}}</span>
      <span>{{review.date}}</span>
      
      <span>Thoughts... {{review.text}}</span>
      <span class="remove-preview-btn" @click.prevent="remove(review.id)"><i class="fa fa-trash trash-icon"></i></span>
    </section>
    `,
  methods: {
    remove() {
      this.$emit('review-removed')
    },
  },
}
