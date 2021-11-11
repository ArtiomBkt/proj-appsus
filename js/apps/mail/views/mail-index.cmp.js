import { mailService } from '../services/mail.service.js'
import mailList from '../cmps/mail-list.cmp.js'
import mailTopFilter from '../cmps/mail-top-search.cmp.js'
import mailSideFilter from '../cmps/mail-side-filter.cmp.js'
import mailFolderList from '../cmps/mail-folder-list.cmp.js'
import mailCompose from '../cmps/mail-compose.cmp.js'

export default {
  name: 'mail-index',
  components: {
    mailService,
    mailList,
    mailTopFilter,
    mailSideFilter,
    mailCompose,
    mailFolderList,
  },
  template: `
        <section class="mail-index">
          <mail-side-filter  />
          <div class="layout-wrapper">
            <mail-top-filter @searched="setSearch" />
            <mail-folder-list @sorted="setSort" />
            <span>Unread Emails: {{unReadMails}}</span>
            <mail-list 
            @read-mail="readMail" 
            @toggle-star="toggleStar"
            @toggle-read="toggleRead"
            @remove-mail="removeMail" 
          :mails="mailsToShow" />
          <!-- <mail-compose @send-mail="sendMail" /> -->
        </div>
        </section>
    `,
  data() {
    return {
      mails: [],
      searchBy: null,
      criteria: {
        folder: null,
      },
    }
  },
  methods: {
    loadMails() {
      mailService.query(this.criteria).then((mails) => (this.mails = mails))
    },
    readMail(mailId) {
      const idx = this.mails.findIndex((mail) => mail.id === mailId)
      this.mails[idx].isRead = true
      mailService.readMail(mailId)
    },
    setSearch(searchBy) {
      console.log(searchBy)
      this.searchBy = searchBy
    },
    setSort(sortBy) {
      this.sortBy = sortBy
    },
    sendMail(mail) {
      mailService.composeMail(mail).then((mail) => this.mails.push(mail))
    },
    toggleStar(mailId) {
      const idx = this.mails.findIndex((mail) => mail.id === mailId)
      this.mails[idx].isStarred = !this.mails[idx].isStarred
      mailService.toggleStar(mailId)
    },
    toggleRead(mailId) {
      const idx = this.mails.findIndex((mail) => mail.id === mailId)
      this.mails[idx].isRead = !this.mails[idx].isRead
      mailService.toggleRead(mailId)
    },
    removeMail(mailId) {
      // const idx = this.mails.findIndex((mail) => mail.id === mailId)
      // this.mails.splice(idx, 1)
      mailService.removeEmail(mailId)
    },
  },
  computed: {
    mailsToShow() {
      if (this.sortBy) this.sortMails
      if (!this.searchBy || !this.searchBy.byTitle) return this.mails
      const { byTitle } = this.searchBy
      if (byTitle) {
        console.log('title')
        const searchStr = byTitle.toLowerCase()
        const mailsToShow = this.mails.filter((mail) => {
          return mail.title.toLowerCase().includes(searchStr)
        })
        return mailsToShow
      }
    },
    unReadMails() {
      var count = 0
      this.mails.forEach((mail) => (!mail.isRead ? count++ : count))
      return count
    },
    sortMails() {
      if (this.sortBy.sortKey === 'title') {
        return this.mails.sort((a, b) => {
          return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
        })
      }
      if (this.sortBy.sortKey === 'date') {
        return this.mails.sort((a, b) => {
          return a.sentAt < b.sentAt ? 1 : -1
        })
      }
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
