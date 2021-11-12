export default {
  name: 'mail-side-filter',
  props: ['mails'],
  template: `
  <aside class="mail-side-filter">
    <button class="compose-btn" @click="compose"><i class="fas fa-plus"></i> Compose</button>
    <router-link to='/mail/inbox'><i class="fas fa-inbox"></i> Inbox {{inboxCount}}</router-link>
    <router-link to='/mail/starred'><i class="fas fa-star"></i> Starred </router-link>
    <router-link to='/mail/sent'><i class="fas fa-paper-plane"></i> Sent </router-link>
    <router-link to='/mail/drafts'><i class="fas fa-envelope-open"></i> Drafts </router-link>
    <router-link to='/mail/trash'><i class="fas fa-trash"></i> Trash </router-link>
    <router-link to='/mail/read'><i class="fas fa-book"></i> Read </router-link>
    <router-link to='/mail/unread'><i class="fas fa-envelope"></i> Unread </router-link>
    <span class="progress-title">Unread Emails</span>
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
      const path = this.$route.name
      if (path === 'inbox') return this.mails.length
    },
  },
  watch: {
    mails: {
      handler() {
        let mailsCount = this.mails.length
        let readCount = this.mails.reduce((acc, mail) => {
          return !mail.isRead ? acc + 1 : acc
        }, 0)
        const percentage = (readCount / mailsCount) * 100
        this.progressVal = percentage ? percentage.toFixed(2) : 0
        this.progressStyle.width = this.progressVal + '%'
      },
    },
  },
}
