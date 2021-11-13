export default {
  name: 'mail-sort-list',
  template: `
    <section class="sort-container">
      <button @click="onSelect($event)" value="from"><i class="fas fa-sort"></i> From</button>
      <button @click="onSelect($event)" value="title"><i class="fas fa-sort"></i> Title</button>
      <button @click="onSelect($event)" value="subject"><i class="fas fa-sort"></i> Subject</button>
      <button @click="onSelect($event)" value="date"><i class="fas fa-sort"></i> Date</button>
    </section>
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
