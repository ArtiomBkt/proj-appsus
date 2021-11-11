export default {
  name: 'mail-preview',
  props: ['mail'],
  template: `
    <router-link :to='/mail/+this.mail.id'>
        <section class="mail-container" :class="isReadBgc" @click.self="read(mail.id)">
          <span class="fa fa-star mail-star" :class="colorStar" @click.stop.prevent="toggleStar(mail.id)"></span>
            <span>From -> </span>
            <span>Subject -> {{mail.subject}}</span>
            <i :class="toggleEnvelope" @click.stop.prevent="toggleRead(mail.id)"></i>
        </section>
    </router-link>
  `,
  methods: {
    read(mailId) {
      this.$emit('read-mail', mailId)
    },
    toggleStar(mailId) {
      this.$emit('toggle-star', mailId)
    },
    toggleRead(mailId) {
      this.$emit('toggle-read', mailId)
    },
  },
  computed: {
    isReadBgc() {
      return this.mail.isRead ? 'mail-read' : 'mail-unread'
    },
    colorStar() {
      return this.mail.isStarred ? 'checked' : ''
    },
    toggleEnvelope() {
      return this.mail.isRead ? 'fas fa-envelope-open' : 'fas fa-envelope'
    },
  },
}
