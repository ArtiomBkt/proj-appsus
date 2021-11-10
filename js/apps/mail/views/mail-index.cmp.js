import { mailService } from '../services/mail.service.js'
import mailList from '../cmps/mail-list.cmp.js'
import mailTopFilter from '../cmps/mail-top-filter.cmp.js'
import mailSideFilter from '../cmps/mail-side-filter.cmp.js'
import mailCompose from '../cmps/mail-compose.cmp.js'

export default {
  name: 'mail-index',
  components: {
    mailService,
    mailList,
    mailTopFilter,
    mailSideFilter,
    mailCompose,
  },
  template: `
        <section>
          <mail-top-filter @filtered="setFilter" />
          <h2>My Emails</h2>
          <mail-side-filter @filtered="setFilter" />
          <mail-list @read-mail="readMail" :mails="mailsToShow" />
          <mail-compose />
        </section>
    `,
  data() {
    return {
      mails: [],
      filterBy: null,
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
  },
  computed: {
    mailsToShow() {
      if (!this.filterBy) return this.mails

      const { bySubject, filterBtn } = this.filterBy

      if (bySubject) {
        const searchStr = bySubject.toLowerCase()
        const mailsToShow = this.mails.filter((mail) => {
          return mail.subject.toLowerCase().includes(searchStr)
        })
        return mailsToShow
      }

      const searchStr = filterBtn.toLowerCase()

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
    },
  },
}
