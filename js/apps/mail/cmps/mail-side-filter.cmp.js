export default {
  name: 'mail-side-filter',
  template: `
  <aside class="mail-side-filter">
    <button class="compose-btn" @click="compose"><i class="fas fa-plus"></i> Compose</button>
    <router-link to='/mail/inbox'><i class="fas fa-inbox"></i> Inbox</router-link>
    <router-link to='/mail/starred'><i class="fas fa-star"></i> Starred</router-link>
    <router-link to='/mail/sent'><i class="fas fa-paper-plane"></i> Sent</router-link>
    <router-link to='/mail/drafts'><i class="fas fa-envelope-open"></i> Drafts</router-link>
    <router-link to='/mail/trash'><i class="fas fa-trash"></i> Trash</router-link>
    <router-link to='/mail/read'><i class="fas fa-book"></i> Read</router-link>
    <router-link to='/mail/unread'><i class="fas fa-envelope"></i> Unread</router-link>
  </aside>
        `,
  methods: {
    compose() {
      this.$emit('compose')
    },
  },
}
