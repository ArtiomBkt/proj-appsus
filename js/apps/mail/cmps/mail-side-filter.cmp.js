export default {
  name: 'mail-side-filter',
  template: `
  <aside class="mail-side-filter">
    <button class="compose-btn"><i class="fas fa-plus"></i> Compose</button>
      <button value="inbox" @click="filter($event)">
      <i class="fas fa-inbox"></i> Inbox</button>
      <button  value="Starred" @click="filter($event)">
      <i class="fas fa-star"></i> Starred</button>
      <button value="Sent" @click="filter($event)">
      <i class="fas fa-paper-plane"></i> Sent</button>
      <button value="Drafts" @click="filter($event)">
      <i class="fas fa-envelope-open"></i> Drafts</button>
      <button value="Trash" @click="filter($event)">
      <i class="fas fa-trash"></i> Trash</button>
      <button value="Read" @click="filter($event)">
      <i class="fas fa-book"></i> Read</button>
      <button value="Unread" @click="filter($event)">
      <i class="fas fa-envelope"></i> Unread</button>
  </aside>
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
