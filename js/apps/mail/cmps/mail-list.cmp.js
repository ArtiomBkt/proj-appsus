import mailPreview from './mail-preview.cmp.js'
import mailDetails from '../views/mail-details.cmp.js'

export default {
  name: 'mail-list',
  components: {
    mailPreview,
    mailDetails,
  },
  props: ['mails'],
  template: `
  <div class="mail-list-container">
      <ul class="mail-list clean-list">
          <li v-for="mail in mails" :key="mail.id">
              <mail-preview :mail="mail"
                @read-mail="read"
                @toggle-star="toggleStar"
                @toggle-read="toggleRead"
                @remove-mail="removeMail"
                @click.native="select(mail)"
                />
                <mail-details v-show="selectedMail && selectedMail === mail" :mail="mail"></mail-details>
              </li>
      </ul>
  </div>
  `,
  data() {
    return {
      selectedMail: null,
    }
  },
  methods: {
    select(mail) {
      if (this.selectedMail === mail) this.selectedMail = null
      else this.selectedMail = mail
    },
    read(mailId) {
      this.$emit('read-mail', mailId)
    },
    toggleRead(mailId) {
      this.$emit('toggle-read', mailId)
    },
    toggleStar(mailId) {
      this.$emit('toggle-star', mailId)
    },
    removeMail(mailId) {
      this.$emit('remove-mail', mailId)
    },
  },
}
