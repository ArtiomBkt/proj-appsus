export default {
  name: 'mail-compose',
  template: `
      <section class="mail-compose">
          <form class="compose-form" @submit.prevent="send">
            <input v-model="mail.to" type="mail" placeholder="Recipient" required/>
            <input v-model="mail.subject" type="text" placeholder="Subject" />
            <textarea v-model="mail.body" type="text" />
            <button>Send</button>
        </form>
    </section>
  `,
  data() {
    return {
      mail: {
        to: null,
        subject: null,
        body: null,
      },
    }
  },
  methods: {
    send() {
      this.$emit('send-mail', { ...this.mail })
      this.clear()
    },
    clear() {
      this.mail.to = ''
      this.mail.subject = ''
      this.mail.body = ''
    },
  },
}
