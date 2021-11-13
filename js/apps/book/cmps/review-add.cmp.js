export default {
  template: `
      <section class="review-add">
          <form @submit.prevent="save">
              <input
               v-model="review.bookreader"
               ref="book-reader-name"
               type="text"
               value="Books Reader"
               placeholder="Books Reader" />
               <div class="rate-star">
                <span v-for="num in 5" class="fa fa-star" :class="{checked:num<=review.rate}" @click="changeColor(num)"></span>
               </div>
              <label for="read-at">Date:</label>
              <input v-model="review.date" type="date" value="" name="read-at">
              <textarea placeholder="Your thoughts.." class="review-body" v-model="review.text"></textarea>
              <button class="review-submit-btn">Submit</button>
          </form>
      </section>
  `,
  data() {
    return {
      review: {
        bookreader: '',
        rate: 3,
        date: new Date().toJSON().slice(0, -14),
        text: '',
      },
    }
  },
  mounted() {
    this.$refs['book-reader-name'].focus()
  },
  methods: {
    save() {
      this.$emit('review-added', { ...this.review })
      this.clear()
    },
    clear() {
      this.review = {
        bookreader: '',
        rate: 3,
        date: new Date().toJSON().slice(0, -14),
        text: '',
      }
    },
    changeColor(num) {
      this.review.rate = num
    },
  },
  computed: {
    currDate() {
      return new Date().toJSON().slice(0, -14)
    },
  },
}
