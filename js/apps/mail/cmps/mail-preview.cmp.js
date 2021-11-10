export default {
  name: 'mail-preview',
  props: ['mail'],
  template: `
    <router-link :to='/mail/+this.mail.id'>
        <section class="mail-container" :class="isReadBgc" @click="read(mail.id)">
            <span>From -> </span>
            <span>Subject -> {{mail.subject}}</span>
        </section>
    </router-link>
  `,
  methods: {
    read(mailId) {
      this.$emit('read-mail', mailId)
    },
  },
  computed: {
    isReadBgc() {
      return this.mail.isRead ? 'mail-read' : 'mail-unread'
    },
  },
}
