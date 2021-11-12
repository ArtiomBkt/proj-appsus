import { mailService } from '../services/mail.service.js'

export default {
  name: 'mail-details',
  props: ['mail'],
  template: `
    <section class="mail-details">
        <template v-if="mail">
            <p>Title: {{mail.title}}</p>
            <p>To: {{mail.to}}</p>
            <p>Subject: {{mail.subject}}</p>
            <p>{{mail.body}}</p>
            <button @click="deleteMail(mail.id)">Delete</button>
            <a @click="$router.go(-1)">Back</a>
        </template>
    </section>
    `,

  // data() {
  //   return {
  //     mail: null,
  //   }
  // },
  methods: {
    deleteMail(mailId) {
      mailService.removeEmail(mailId)
      this.$router.push('/mail')
    },
  },
  // watch: {
  //   '$route.params.mailId': {
  //     immediate: true,
  //     handler() {
  //       const { mailId } = this.$route.params
  //       mailService.getMailById(mailId).then((mail) => (this.mail = mail))
  //     },
  //   },
  // },
}
