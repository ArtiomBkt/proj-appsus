import { mailService } from '../services/mail.service.js'
import mailList from '../cmps/mail-list.cmp.js'
import mailTopFilter from '../cmps/mail-top-search.cmp.js'
import mailSideFilter from '../cmps/mail-side-filter.cmp.js'
import mailSortList from '../cmps/mail-sort-list.cmp.js'
import mailCompose from '../cmps/mail-compose.cmp.js'

export default {
  name: 'mail-index',
  components: {
    mailService,
    mailList,
    mailTopFilter,
    mailSideFilter,
    mailCompose,
    mailSortList,
  },
  template: `
        <section class="mail-index">
          <mail-side-filter @compose="openCompose" :foldersMap="foldersMap"/>
          <div class="layout-wrapper">
            <mail-top-filter @searched="setSearch" />
            <mail-sort-list @sorted="setSort" />
            <mail-list 
            @read-mail="readMail" 
            @toggle-star="toggleStar"
            @toggle-read="toggleRead"
            @remove-mail="removeMail"
            :mails="mailsToShow" />
          </div>
          <mail-compose v-if="showCompose" :mailTemplate="mailTemplate" @send-mail="sendMail" @autosave-mail="autoSave" @close-compose="closeCompose" />
        </section>
    `,
  data() {
    return {
      mails: [],
      foldersMap: {},
      searchBy: null,
      sortBy: null,
      criteria: {
        folder: null,
      },
      showCompose: false,
      mailTemplate: null,
    }
  },
  methods: {
    loadMails() {
      mailService.query(this.criteria).then((mails) => (this.mails = mails))
      mailService.getMailMap().then((mailsMap) => (this.foldersMap = mailsMap))
    },
    readMail(mailId) {
      const idx = this.mails.findIndex((mail) => mail.id === mailId)
      if (!this.mails[idx].isRead) {
        this.mails[idx].isRead = true
        mailService.readMail(mailId).then(this.loadMails)
      }
    },
    setSearch(searchBy) {
      this.searchBy = searchBy
    },
    setSort(sortBy) {
      this.sortBy = sortBy
    },
    openCompose() {
      mailService.createMail().then((mailTemplate) => {
        this.mailTemplate = mailTemplate
        this.showCompose = true
      })
    },
    closeCompose() {
      this.showCompose = false
    },
    sendMail(mail) {
      mailService.composeMail(mail).then(this.loadMails)
      this.showCompose = false
    },
    toggleStar(mailId) {
      const idx = this.mails.findIndex((mail) => mail.id === mailId)
      this.mails[idx].isStarred = !this.mails[idx].isStarred
      mailService.toggleStar(mailId).then(this.loadMails)
    },
    toggleRead(mailId) {
      const idx = this.mails.findIndex((mail) => mail.id === mailId)
      this.mails[idx].isRead = !this.mails[idx].isRead
      mailService.toggleRead(mailId).then(this.loadMails)
    },
    removeMail(mailId) {
      const idx = this.mails.findIndex((mail) => mail.id === mailId)
      this.mails.splice(idx, 1)
      mailService.removeEmail(mailId).then(this.loadMails)
    },
    autoSave(mail) {
      mailService.autoSave(mail).then(this.loadMails)
    },
  },
  computed: {
    mailsToShow() {
      if (this.sortBy) this.sortMails
      if (!this.searchBy || !this.searchBy.byTitle) return this.mails
      const { byTitle } = this.searchBy
      if (byTitle) {
        const searchStr = byTitle.toLowerCase()
        const mailsToShow = this.mails.filter((mail) => {
          return mail.title.toLowerCase().includes(searchStr)
        })
        return mailsToShow
      }
    },
    sortMails() {
      return this.mails.sort((a, b) => {
        if (this.sortBy.sortKey === 'title')
          return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
        if (this.sortBy.sortKey === 'date')
          return a.updatedAt < b.updatedAt ? 1 : -1
        if (this.sortBy.sortKey === 'subject')
          return a.subject.toLowerCase() > b.subject.toLowerCase() ? 1 : -1
        if (this.sortBy.sortKey === 'from')
          return a.from.toLowerCase() > b.from.toLowerCase() ? 1 : -1
      })
    },
  },
  watch: {
    '$route.name': {
      immediate: true,
      handler() {
        this.criteria.folder = this.$route.name
        this.loadMails()
      },
    },
  },
}
