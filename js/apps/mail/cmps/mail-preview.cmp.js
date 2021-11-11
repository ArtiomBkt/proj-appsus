export default {
  name: 'mail-preview',
  props: ['mail'],
  template: `
    <!-- <router-link :to='/mail/+this.mail.id' class="mail-route"> -->
        <section class="mail-container" :class="isReadBgc" @click="read(mail.id)" >
          <div class="mail-content">
            <span class="fa fa-star mail-star" :class="colorStar" @click.stop.prevent="toggleStar(mail.id)"></span>
            <span>{{mail.title}}</span>
            <span>{{mail.subject}}</span>
            </div>
            <section class="mail-actions">
              <span @click.stop.prevent="toggleRead(mail.id)">
              <i :class="toggleEnvelope" class="envelope-icon">
              </i>
              </span>
              <span @click.stop.prevent="removeMail(mail.id)">
              <i class="fa fa-trash trash-icon"></i>
              </span>
          </section>
      </section>
    <!-- </router-link> -->
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
    removeMail(mailId) {
      this.$emit('remove-mail', mailId)
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
