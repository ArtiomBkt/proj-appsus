export default {
  name: 'mail-side-filter',
  props: ['foldersMap'],
  template: `
  <aside class="mail-side-filter">
    <!-- <button class="compose-btn" @click="compose"><span><i class="fas fa-plus"></i>Compose</span></button> -->
    <router-link to='/mail/drafts/compose' class="compose-btn"  @click="compose"> <i class="fas fa-plus"></i> Compose </router-link>
    <router-link to='/mail/inbox'><i class="fas fa-inbox"></i> Inbox ({{inboxCount}})</router-link>
    <router-link to='/mail/starred'><i class="fas fa-star"></i> Starred ({{starredCount}})</router-link>
    <router-link to='/mail/sent'><i class="fas fa-paper-plane"></i> Sent ({{sentCount}})</router-link>
    <router-link to='/mail/drafts'><i class="fas fa-envelope-open"></i> Drafts ({{draftsCount}})</router-link>
    <router-link to='/mail/trash'><i class="fas fa-trash"></i> Trash ({{trashCount}})</router-link>
    <router-link to='/mail/read'><i class="fas fa-book"></i> Read ({{readCount}})</router-link>
    <router-link to='/mail/unread'><i class="fas fa-envelope"></i> Unread ({{unreadCount}})</router-link>
    <div class="progress-bar">
      <span :style="progressStyle">{{percentageToShow}}</span>
      <progress :value="progressVal" max="100"></progress>
    </div>
  </aside>
        `,
  data() {
    return {
      progressVal: null,
      progressStyle: {
        width: null,
      },
    }
  },
  methods: {
    compose() {
      this.$emit('compose')
    },
  },

  computed: {
    percentageToShow() {
      return this.progressStyle.width
    },
    inboxCount() {
      return this.foldersMap.inbox
    },
    starredCount() {
      return this.foldersMap.starred
    },
    sentCount() {
      return this.foldersMap.sent
    },
    draftsCount() {
      return this.foldersMap.drafts
    },
    trashCount() {
      return this.foldersMap.trash
    },
    readCount() {
      return this.foldersMap.read
    },
    unreadCount() {
      return this.foldersMap.unread
    },
  },
  watch: {
    foldersMap: {
      immediate: true,
      handler() {
        const mailsCount = this.foldersMap.all
        const unreadCount = this.foldersMap.unread
        const percentage = (unreadCount / mailsCount) * 100
        this.progressVal = percentage ? percentage.toFixed(0) : 0
        this.progressStyle.width = this.progressVal + '% - Unread emails'
      },
    },
  },
}
