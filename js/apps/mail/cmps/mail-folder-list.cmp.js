export default {
  name: 'mail-folder-list',
  template: `
    <select @change="onSelect($event)">
        <option value="title">Title</option>
        <option value="date">Date</option>
    </select>
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
