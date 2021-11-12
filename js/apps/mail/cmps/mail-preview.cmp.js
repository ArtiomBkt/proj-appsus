import longText from '../../../cmps/long-txt.cmp.js'

export default {
  name: 'mail-preview',
  props: ['mail'],
  components: {
    longText,
  },
  template: `
        <section class="mail-container" :class="isReadBgc" @click="read(mail.id)" >
          <div class="mail-content">
          <span class="mail-star" :class="colorStar" @click.stop.prevent="toggleStar(mail.id)"> 
          </span>
              <span>{{mail.from}}</span>
              <long-text v-bind:txt="mail.subject" /> 
              <!-- <span>{{mail.subject}}</span> -->
              <span>{{timeToShow}}</span>
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
      return this.mail.isRead ? 'mail-read ' : 'mail-unread'
    },
    colorStar() {
      return this.mail.isStarred ? 'fa fa-star checked' : 'far fa-star'
    },
    toggleEnvelope() {
      return this.mail.isRead ? 'fas fa-envelope-open' : 'fas fa-envelope'
    },
    timeToShow() {
      return this.mail.updatedAt
    },
  },
}
