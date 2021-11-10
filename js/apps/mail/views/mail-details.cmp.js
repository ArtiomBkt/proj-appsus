import { mailService } from '../services/mail.service.js'

export default {
  name: 'mail-details',
  template: `
    <section class="mail-details">
        <template v-if="mail">
            <p>to: {{mail.to}}</p>
            <!-- subject should be with txt size limit -->
            <p>subject: {{mail.subject}}</p>
            <p>body: {{mail.body}}</p>
            <p>sentAt: {{mail.sentAt}}</p>
            <p>isRead: {{mail.isRead}}</p>
            <button @click="deleteMail(mail.id)">Delete</button>
            <router-link to="/mail">Back</router-link>
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
