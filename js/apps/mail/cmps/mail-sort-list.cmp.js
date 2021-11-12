export default {
  name: 'mail-sort-list',
  template: `
    <section class="sort-container">
      <button @click="onSelect($event)" value="from">From</button>
      <button @click="onSelect($event)" value="title">Title</button>
      <button @click="onSelect($event)" value="subject">Subject</button>
      <button @click="onSelect($event)" value="date">Date</button>
    </section>
    <!-- <select @change="onSelect($event)">
        <option value="title">Title</option>
        <option value="date">Date</option>
        <option value="subject">Subject</option>
        <option value="from">From</option>
    </select> -->
  `,
  data() {
    return {
      sortBy: {
        sortKey: null,
      },
    }
  },
  methods: {
    onSelect(event) {
      this.sortBy.sortKey = event.target.value
      this.$emit('sorted', { ...this.sortBy })
    },
  },
}
