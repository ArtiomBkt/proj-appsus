export default {
  name: 'mail-side-filter',
  template: `
  <div class="mail-side-filter">
      <button value="inbox" @click="filter($event)">Inbox</button>
      <button value="Starred" @click="filter($event)">Starred</button>
      <button value="Sent" @click="filter($event)">Sent</button>
      <button value="Drafts" @click="filter($event)">Drafts</button>
      <button value="Trash" @click="filter($event)">Trash</button>
      <button value="Read" @click="filter($event)">Read</button>
      <button value="Unread" @click="filter($event)">Unread</button>
  </div>
        `,
  data() {
    return {
      filterBy: {
        filterBtn: null,
      },
    }
  },
  methods: {
    filter(event) {
      this.filterBy.filterBtn = event.target.value
      this.$emit('filtered', { ...this.filterBy })
    },
  },
}
