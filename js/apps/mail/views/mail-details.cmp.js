import { mailService } from '../services/mail.service.js'

export default {
  name: 'mail-details',
  props: ['mail'],
  template: `
    <section class="mail-details">
        <div class="details-actions">
        <span class="mail-timestamp">{{timeToShow}}</span>
          <span title="Expand">
            <i class="fas fa-expand"></i>
          </span>
          <span @click="shareAsNote(mail)" title="Save as note">
            <i class="fas fa-paper-plane"></i>
          </span>
          <span @click.stop.prevent="removeMail(mail.id)" class="details-delete-mail" title="Delete">
            <i class="fa fa-trash trash-icon"></i>
          </span>
        </div>
        <div v-if="mail" class="mail-details-content capitalize">
          <p><span>Title:</span>{{mail.title}}</p>
          <p><span>To: </span>{{mail.to}}</p>
          <span>Subject: </span>
          <p>{{mail.subject}}</p>
          <span>Message: </span>
          <p>{{mail.body}}</p>
        </div> 
        <!-- <a @click="$router.go(-1)"><i class="fas fa-arrow-left details-back"></i></a> -->
    </section>
    `,
  methods: {
    removeMail(mailId) {
      this.$emit('remove-mail', mailId)
    },
    shareAsNote(mail) {
      const url = mailService.prepareParams(mail)
      this.$router.push(url)
    },
  },
  computed: {
    timeToShow() {
      return this.mail.updatedAt
    },
  },
}
