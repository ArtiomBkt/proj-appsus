export default {
  name: 'mail-compose',
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
              <input v-model="mail.subject" type="text" class="compose-subject" placeholder="Subject" />
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
      mail: {
        title: '',
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
      this.mail.title = ''
      this.mail.to = ''
      this.mail.subject = ''
      this.mail.body = ''
    },
    closeCompose() {
      this.$emit('close-compose')
    },
  },
}
