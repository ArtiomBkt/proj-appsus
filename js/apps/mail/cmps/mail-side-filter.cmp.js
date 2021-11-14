export default {
  name: 'mail-side-filter',
  props: ['foldersMap'],
  template: `
  <div class="side-nav-container">
    <!-- <button class="compose-btn" @click="compose"><span><i class="fas fa-plus"></i>Compose</span></button> -->
    <aside :class="isSideNavOpen" class="mail-side-filter">
        <router-link to='/mail/drafts/compose' class="compose-btn"  @click="compose"> <i class="fas fa-plus"></i> Compose </router-link>
        <router-link to='/mail/inbox'><i class="fas fa-inbox"></i> Inbox ({{inboxCount}})</router-link>
        <router-link to='/mail/starred'><i class="fas fa-star"></i> Starred ({{starredCount}})</router-link>
        <router-link to='/mail/sent'><i class="fas fa-paper-plane"></i> Sent ({{sentCount}})</router-link>
        <router-link to='/mail/drafts'><i class="fas fa-envelope-open"></i> Drafts ({{draftsCount}})</router-link>
        <router-link to='/mail/trash'><i class="fas fa-trash"></i> Trash ({{trashCount}})</router-link>
        <router-link to='/mail/read'><i class="fas fa-book"></i> Read ({{readCount}})</router-link>
        <router-link to='/mail/unread'><i class="fas fa-envelope"></i> Unread ({{unreadCount}})</router-link>
        <span class="unread-emails-txt">Unread emails</span>
        <div class="progress-bar">
          <span class="percentage" :style="progressStyle">{{percentageToShow}}</span>
          <progress :value="progressVal" max="100"></progress>
        </div>
    </aside>
    <div v-if="windowWidth" :class="isSideNavOpen" @click="openSideNav" class="sidenav-collapser">
        <span :class="isSideNavOpen" class="line"> </span>
        <span :class="isSideNavOpen" class="line"> </span>
    </div>
</div>
        `,
  data() {
    return {
      progressVal: null,
      progressStyle: {
        width: null,
      },
      windowWidth: window.innerWidth,
      sideNavCollapse: false,
      sideNavOpen: false,
    }
  },
  methods: {
    compose() {
      this.$emit('compose')
    },
    onResize() {
      this.windowWidth = window.innerWidth
      this.sideNavCollapse = this.windowWidth < 761 ? true : false
    },
    openSideNav() {
      this.sideNavOpen = !this.sideNavOpen
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('onresize', this.onResize)
    })
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
    isSideNavOpen() {
      return this.sideNavOpen ? 'nav-open' : ''
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
        this.progressStyle.width = this.progressVal + '%'
      },
    },
  },
}
