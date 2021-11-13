export default {
  name: 'mail-compose',
  props: ['mailTemplate'],
  template: `
      <section class="mail-compose">
          <form class="compose-form" @submit.prevent="send">
            <div class="compose-form-header">
              <h2>New Message</h2>
              <span @click.stop.prevent="closeCompose" class="close-form"><i class="fas fa-times"></i></span>
            </div>
            <div class="compose-content">
              <input v-model="mail.title" class="compose-title" type="text" placeholder="Title" required/>
              <input v-model="mail.to" type="mail" class="compose-to" placeholder="To: " required/>
              <input v-model="mail.subject" type="text" class="compose-subject" placeholder="Subject" required/>
              <textarea v-model="mail.body" class="compose-body" type="text" />
            </div>
            <div class="compose-actions">
              <button type="submit" class="send-btn">Send</button>
              <span class="compose-trash">
                <i class="fas fa-trash"></i>
              </span>
            </div>
        </form>
    </section>
  `,
  data() {
    return {
      myInterval: null,
      mail: null,
    }
  },
  created() {
    console.log(this.$route)
    this.mail = this.mailTemplate
    this.mail.title = this.$route.query.subject
    this.mail.body = this.$route.query.body
    this.myInterval = setInterval(() => {
      if (this.mail.subject) {
        this.$emit('autosave-mail', { ...this.mail })
      }
    }, 5000)
  },
  methods: {
    send() {
      this.$emit('send-mail', { ...this.mail })
      this.clear()
    },
    clear() {
      this.mail.title = ''
      this.mail.to = ''
      this.mail.subject = ''
      this.mail.body = ''
    },
    closeCompose() {
      this.$emit('close-compose')
    },
  },
  destroyed() {
    clearInterval(this.myInterval)
  },
}
