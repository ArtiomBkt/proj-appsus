import { eventBus } from './../services/event-bus.service.js'

export default {
    name: 'flash-msg',
    template: `
    <transition name="fade">
        <div v-if="msg" class="flash-msg" :class="msg.type">
            <p>{{ msg.txt }}</p>
        </div>
    </transition>
    `,
    data() {
        return {
            msg: null
        }
    },
    created() {
        eventBus.$on('showMsg', this.showMsg)
    },
    destroyed() {
        eventBus.$off('showMsg', this.showMsg)
    },
    methods: {
        showMsg(msg) {
            this.msg = msg
            setTimeout(() => this.msg = null, 3000)
        }
    }
}