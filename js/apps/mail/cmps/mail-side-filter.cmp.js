export default {
  name: 'mail-side-filter',
  template: `
  <div class="mail-side-filter">
      <button value="inbox" @click="filter($event)">Inbox</button>
      <button value="Starred" @click="filter($event)">Starred</button>
      <button value="Sent" @click="filter($event)">Sent</button>
      <button value="Drafts" @click="filter($event)">Drafts</button>
      <button value="Trash" @click="filter($event)">Trash</button>
      <label>
      <input type="radio" name="filter" id="1" @click="filter($event)">Read</input>
      <input type="radio" name="filter" id="0" @click="filter($event)">Unread</input>
      </label>
  </div>
        `,
  data() {
    return {
      filterBy: {
        filterVal: null,
      },
    }
  },
  methods: {
    filter(event) {
      this.filterBy.filterVal = event.target.value
      this.$emit('filtered', { ...this.filterBy })
    },
  },
}
