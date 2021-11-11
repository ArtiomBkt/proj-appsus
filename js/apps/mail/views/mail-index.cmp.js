import { mailService } from '../services/mail.service.js'
import mailList from '../cmps/mail-list.cmp.js'
import mailTopFilter from '../cmps/mail-top-filter.cmp.js'
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
        <section>
          <mail-top-filter @filtered="setFilter" />
          <h2>My Emails</h2>
          <mail-folder-list @sorted="setSort" />
          <mail-side-filter @filtered="setFilter" />
          <mail-list @read-mail="readMail" @toggle-star="toggleStar" @toggle-read="toggleRead" :mails="mailsToShow"  />
          <mail-compose @send-mail="sendMail" />
          <span>Unread Emails: {{unReadMails}}</span>
        </section>
    `,
  data() {
    return {
      mails: [],
      filterBy: null,
      sortBy: {
        sortKey: 'title',
      },
    }
  },
  created() {
    this.loadMails()
  },
  methods: {
    loadMails() {
      mailService.query().then((mails) => (this.mails = mails))
    },
    readMail(mailId) {
      mailService.readMail(mailId)
    },
    setFilter(filterBy) {
      this.filterBy = filterBy
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
  },
  computed: {
    mailsToShow() {
      if (this.sortBy) this.sortMails
      if (!this.filterBy || !this.filterBy.bySubject) return this.mails
      const { bySubject, filterBtn } = this.filterBy
      if (bySubject) {
        const searchStr = bySubject.toLowerCase()
        const mailsToShow = this.mails.filter((mail) => {
          return mail.subject.toLowerCase().includes(searchStr)
        })
        return mailsToShow
      }
      const searchStr = filterBtn.toLowerCase()
      if (searchStr === 'inbox') return this.mails

      if (searchStr === 'read') {
        const mailsToShow = this.mails.filter((mail) => {
          return mail.isRead
        })
        return mailsToShow
      }
      if (searchStr === 'unread') {
        const mailsToShow = this.mails.filter((mail) => {
          return !mail.isRead
        })
        return mailsToShow
      }
      if (searchStr === 'starred') {
        const mailsToShow = this.mails.filter((mail) => {
          return mail.isStarred
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
          return a.subject.toLowerCase() > b.subject.toLowerCase() ? 1 : -1
        })
      }
      if (this.sortBy.sortKey === 'date') {
        return this.mails.sort((a, b) => {
          return a.sentAt < b.sentAt ? 1 : -1
        })
      }
    },
  },
}
