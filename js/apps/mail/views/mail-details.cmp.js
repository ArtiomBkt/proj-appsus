import { mailService } from '../services/mail.service.js'

export default {
  name: 'mail-details',
  template: `
    <section class="mail-details">
        <template v-if="mail">
            <p>id: {{mail.id}}</p>
            <p>title: {{mail.title}}</p>
            <p>from: {{mail.from}}</p>
            <p>to: {{mail.to}}</p>
            <!-- subject should be with txt size limit -->
            <p>subject: {{mail.subject}}</p>
            <p>body: {{mail.body}}</p>
            <p>sentAt: {{mail.sentAt}}</p>
            <p>isRead: {{mail.isRead}}</p>
            <p>isStarred: {{mail.isStarred}}</p>
            <button @click="deleteMail(mail.id)">Delete</button>
            <a @click="$router.go(-1)">Back</a>
        </template>
    </section>
    `,

  data() {
    return {
      mail: null,
    }
  },
  methods: {
    deleteMail(mailId) {
      mailService.removeEmail(mailId)
      this.$router.push('/mail')
    },
  },
  watch: {
    '$route.params.mailId': {
      immediate: true,
      handler() {
        const { mailId } = this.$route.params
        mailService.getMailById(mailId).then((mail) => (this.mail = mail))
      },
    },
  },
}
