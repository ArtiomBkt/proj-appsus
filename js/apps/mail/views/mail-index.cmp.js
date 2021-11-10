import { mailService } from '../services/mail.service.js'
import mailList from '../cmps/mail-list.cmp.js'
import mailTopFilter from '../cmps/mail-top-filter.cmp.js'
import mailSideFilter from '../cmps/mail-side-filter.cmp.js'

export default {
  name: 'mail-index',
  components: {
    mailService,
    mailList,
    mailTopFilter,
    mailSideFilter,
  },
  template: `
        <section>
            <mail-top-filter @filtered="setFilter" />
            <h2>My Emails</h2>
            <mail-side-filter @filtered="setFilter" />
            <mail-list @read-mail="readMail" :mails="mailsToShow" />
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
      console.log(filterBy)
      this.filterBy = filterBy
    },
  },
  computed: {
    mailsToShow() {
      if (!this.filterBy) return this.mails
      const { filterVal } = this.filterBy
      // const { filterVal } = this.filterBy
      // const searchStr = bySubject.toLowerCase()
      const searchStr = filterVal.toLowerCase()
      const mailsToShow = this.mails.filter((mail) => {
        // return mail.subject.toLowerCase().includes(searchStr)
        // return mail.subject.toLowerCase().includes(searchStr)
        // read === mail.isRead
        // unread === !mail.isRead
      })
      return mailsToShow
    },
  },
}
