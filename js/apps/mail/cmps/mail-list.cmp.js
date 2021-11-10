import mailPreview from './mail-preview.cmp.js'

export default {
  name: 'mail-list',
  components: {
    mailPreview,
  },
  props: ['mails'],
  template: `
  <div class="mail-list-container">
      <ul class="mail-list clean-list">
          <li v-for="mail in mails" :key="mail.id">
              <mail-preview :mail="mail" @read-mail="read"/>
          </li>
      </ul>
  </div>
  `,
  methods: {
    read(mailId) {
      this.$emit('read-mail', mailId)
    },
  },
}
